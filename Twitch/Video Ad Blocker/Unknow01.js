async function getNewUsher(realFetch, originalResponse, channelName) {
    var accessTokenResponse = await getAccessToken(channelName, PlayerType1);
    var encodingsM3u8 = '';

    if (accessTokenResponse.status === 200) {

        var accessToken = await accessTokenResponse.json();

        try {
            var urlInfo = new URL('https://usher.ttvnw.net/api/channel/hls/' + channelName + '.m3u8' + UsherParams);
            urlInfo.searchParams.set('sig', accessToken.data.streamPlaybackAccessToken.signature);
            urlInfo.searchParams.set('token', accessToken.data.streamPlaybackAccessToken.value);
            var encodingsM3u8Response = await realFetch(urlInfo.href);
            if (encodingsM3u8Response.status === 200) {
                encodingsM3u8 = await encodingsM3u8Response.text();
                return encodingsM3u8;
            } else {
                return originalResponse;
            }
        } catch (err) {}
        return originalResponse;
    } else {
        return originalResponse;
    }
}
async function processM3U8(url, textStr, realFetch, playerType) {
    //Checks the m3u8 for ads and if it finds one, instead returns an ad-free stream.

    //Ad blocking for squad streams is disabled due to the way multiple weaver urls are used. No workaround so far.
    if (IsSquadStream == true) {
        return textStr;
    }

    if (!textStr) {
        return textStr;
    }

    //Some live streams use mp4.
    if (!textStr.includes(".ts") && !textStr.includes(".mp4")) {
        return textStr;
    }

    var haveAdTags = textStr.includes(AdSignifier);

    if (haveAdTags) {

        //Reduces ad frequency.
        try {
            tryNotifyTwitch(textStr);
        } catch (err) {}

        var accessTokenResponse = await getAccessToken(CurrentChannelName, playerType);

        if (accessTokenResponse.status === 200) {

            var accessToken = await accessTokenResponse.json();

            try {
                var urlInfo = new URL('https://usher.ttvnw.net/api/channel/hls/' + CurrentChannelName + '.m3u8' + UsherParams);
                urlInfo.searchParams.set('sig', accessToken.data.streamPlaybackAccessToken.signature);
                urlInfo.searchParams.set('token', accessToken.data.streamPlaybackAccessToken.value);
                var encodingsM3u8Response = await realFetch(urlInfo.href);
                if (encodingsM3u8Response.status === 200) {

                    var encodingsM3u8 = await encodingsM3u8Response.text();

                    streamM3u8Url = encodingsM3u8.match(/^https:.*\.m3u8$/mg)[0];

                    var streamM3u8Response = await realFetch(streamM3u8Url);
                    if (streamM3u8Response.status == 200) {
                        var m3u8Text = await streamM3u8Response.text();
                        WasShowingAd = true;
                        if (HideBlockingMessage == false) {
                            if (Math.floor(Math.random() * 4) == 3) {
                                postMessage({
                                    key: 'ShowDonateBanner'
                                });
                            } else {
                                postMessage({
                                    key: 'ShowAdBlockBanner'
                                });
                            }
                        } else if (HideBlockingMessage == true) {
                            postMessage({
                                key: 'HideAdBlockBanner'
                            });
                        }

                        postMessage({
                            key: 'ForceChangeQuality'
                        });

                        return m3u8Text;
                    } else {
                        return textStr;
                    }
                } else {
                    return textStr;
                }
            } catch (err) {}
            return textStr;
        } else {
            return textStr;
        }
    } else {
        if (WasShowingAd) {
            WasShowingAd = false;
            //Here we put player back to original quality and remove the blocking message.
            postMessage({
                key: 'ForceChangeQuality',
                value: 'original'
            });
            postMessage({
                key: 'PauseResumePlayer'
            });
            postMessage({
                key: 'HideAdBlockBanner'
            });
        }
        return textStr;
    }
    return textStr;
}

function hookWorkerFetch() {
    var realFetch = fetch;
    fetch = async function(url, options) {
        if (typeof url === 'string') {
            if (url.includes('video-weaver')) {
                return new Promise(function(resolve, reject) {
                    var processAfter = async function(response) {
                        //Here we check the m3u8 for any ads and also try fallback player types if needed.

                        var responseText = await response.text();
                        var weaverText = null;

                        weaverText = await processM3U8(url, responseText, realFetch, PlayerType2);
                        if (weaverText.includes(AdSignifier)) {
                            weaverText = await processM3U8(url, responseText, realFetch, PlayerType3);
                        }
                        if (weaverText.includes(AdSignifier)) {
                            weaverText = await processM3U8(url, responseText, realFetch, PlayerType4);
                        }

                        resolve(new Response(weaverText));
                    };
                    var send = function() {
                        return realFetch(url, options).then(function(response) {
                            processAfter(response);
                        })['catch'](function(err) {
                            reject(err);
                        });
                    };
                    send();
                });
            } else if (url.includes('/api/channel/hls/')) {
                var channelName = (new URL(url)).pathname.match(/([^\/]+)(?=\.\w+$)/)[0];
                UsherParams = (new URL(url)).search;
                CurrentChannelName = channelName;
                //To prevent pause/resume loop for mid-rolls.
                var isPBYPRequest = url.includes('picture-by-picture');
                if (isPBYPRequest) {
                    url = '';
                }
                //Make new Usher request if needed to create fallback if UBlock bypass method fails.
                var useNewUsher = false;
                if (url.includes('subscriber%22%3Afalse') && url.includes('hide_ads%22%3Afalse') && url.includes('show_ads%22%3Atrue')) {
                    useNewUsher = true;
                }
                if (url.includes('subscriber%22%3Atrue') && url.includes('hide_ads%22%3Afalse') && url.includes('show_ads%22%3Atrue')) {
                    useNewUsher = true;
                }
                if (useNewUsher == true) {
                    return new Promise(function(resolve, reject) {
                        var processAfter = async function(response) {
                            encodingsM3u8 = await getNewUsher(realFetch, response, channelName);
                            if (encodingsM3u8.length > 1) {
                                resolve(new Response(encodingsM3u8));
                            } else {
                                postMessage({
                                    key: 'HideAdBlockBanner'
                                });
                                resolve(encodingsM3u8);
                            }
                        };
                        var send = function() {
                            return realFetch(url, options).then(function(response) {
                                processAfter(response);
                            })['catch'](function(err) {
                                reject(err);
                            });
                        };
                        send();
                    });
                }
            }
        }
        return realFetch.apply(this, arguments);
    };
}

function declareOptions(scope) {
    scope.AdSignifier = 'stitched';
    scope.ClientID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';
    scope.ClientVersion = 'null';
    scope.ClientSession = 'null';
    scope.PlayerType1 = 'site'; //Source
    scope.PlayerType2 = 'thunderdome'; //480p
    scope.PlayerType3 = 'pop_tart'; //480p
    scope.PlayerType4 = 'picture-by-picture'; //360p
    scope.CurrentChannelName = null;
    scope.UsherParams = null;
    scope.WasShowingAd = false;
    scope.GQLDeviceID = null;
    scope.HideBlockingMessage = false;
    scope.IsSquadStream = false;
}

function getAccessToken(channelName, playerType, realFetch) {
    var body = null;
    var templateQuery = 'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}';
    body = {
        operationName: 'PlaybackAccessToken_Template',
        query: templateQuery,
        variables: {
            'isLive': true,
            'login': channelName,
            'isVod': false,
            'vodID': '',
            'playerType': playerType
        }
    };
    return gqlRequest(body, realFetch);
}

function gqlRequest(body, realFetch) {
    var fetchFunc = realFetch ? realFetch : fetch;
    if (!GQLDeviceID) {
        var dcharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var dcharactersLength = dcharacters.length;
        for (var i = 0; i < 32; i++) {
            GQLDeviceID += dcharacters.charAt(Math.floor(Math.random() * dcharactersLength));
        }
    }
    return fetchFunc('https://gql.twitch.tv/gql', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Client-ID': ClientID,
            'Device-ID': GQLDeviceID,
            'X-Device-Id': GQLDeviceID,
            'Client-Version': ClientVersion,
            'Client-Session-Id': ClientSession
        }
    });
}

function adRecordgqlPacket(event, radToken, payload) {
    return [{
        operationName: 'ClientSideAdEventHandling_RecordAdEvent',
        variables: {
            input: {
                eventName: event,
                eventPayload: JSON.stringify(payload),
                radToken,
            },
        },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash: '7e6c69e6eb59f8ccb97ab73686f3d8b7d85a72a0298745ccd8bfc68e4054ca5b',
            },
        },
    }];
}
async function tryNotifyTwitch(streamM3u8) {
    //We notify that an ad was requested but was not visible and was also muted.
    var matches = streamM3u8.match(/#EXT-X-DATERANGE:(ID="stitched-ad-[^\n]+)\n/);
    if (matches.length > 1) {
        const attrString = matches[1];
        const attr = parseAttributes(attrString);
        var podLength = parseInt(attr['X-TV-TWITCH-AD-POD-LENGTH'] ? attr['X-TV-TWITCH-AD-POD-LENGTH'] : '1');
        var podPosition = parseInt(attr['X-TV-TWITCH-AD-POD-POSITION'] ? attr['X-TV-TWITCH-AD-POD-POSITION'] : '0');
        var radToken = attr['X-TV-TWITCH-AD-RADS-TOKEN'];
        var lineItemId = attr['X-TV-TWITCH-AD-LINE-ITEM-ID'];
        var orderId = attr['X-TV-TWITCH-AD-ORDER-ID'];
        var creativeId = attr['X-TV-TWITCH-AD-CREATIVE-ID'];
        var adId = attr['X-TV-TWITCH-AD-ADVERTISER-ID'];
        var rollType = attr['X-TV-TWITCH-AD-ROLL-TYPE'].toLowerCase();
        const baseData = {
            stitched: true,
            roll_type: rollType,
            player_mute: true,
            player_volume: 0.0,
            visible: false,
        };
        for (let podPosition = 0; podPosition < podLength; podPosition++) {
            const extendedData = {
                ...baseData,
                ad_id: adId,
                ad_position: podPosition,
                duration: 0,
                creative_id: creativeId,
                total_ads: podLength,
                order_id: orderId,
                line_item_id: lineItemId,
            };
            await gqlRequest(adRecordgqlPacket('video_ad_impression', radToken, extendedData));
            for (let quartile = 0; quartile < 4; quartile++) {
                await gqlRequest(
                    adRecordgqlPacket('video_ad_quartile_complete', radToken, {
                        ...extendedData,
                        quartile: quartile + 1,
                    })
                );
            }
            await gqlRequest(adRecordgqlPacket('video_ad_pod_complete', radToken, baseData));
        }
    }
}

function parseAttributes(str) {
    return Object.fromEntries(
        str.split(/(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))/)
        .filter(Boolean)
        .map(x => {
            const idx = x.indexOf('=');
            const key = x.substring(0, idx);
            const value = x.substring(idx + 1);
            const num = Number(value);
            return [key, Number.isNaN(num) ? value.startsWith('"') ? JSON.parse(value) : value : num];
        }));
}
declareOptions(self);
self.addEventListener('message', function(e) {
    if (e.data.key == 'UpdateIsSquadStream') {
        IsSquadStream = e.data.value;
    } else if (e.data.key == 'UpdateClientVersion') {
        ClientVersion = e.data.value;
    } else if (e.data.key == 'UpdateClientSession') {
        ClientSession = e.data.value;
    } else if (e.data.key == 'UpdateClientId') {
        ClientID = e.data.value;
    } else if (e.data.key == 'UpdateDeviceId') {
        GQLDeviceID = e.data.value;
    } else if (e.data.key == 'SetHideBlockingMessage') {
        if (e.data.value == "true") {
            HideBlockingMessage = true;
        } else if (e.data.value == "false") {
            HideBlockingMessage = false;
        }
    }
});
hookWorkerFetch();
importScripts('https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min-d5099cd30cc0e8f22493.js');