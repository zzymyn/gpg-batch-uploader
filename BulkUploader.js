// This is free and unencumbered software released into the public domain.
// 
// Anyone is free to copy, modify, publish, use, compile, sell, or
// distribute this software, either in source code form or as a compiled
// binary, for any purpose, commercial or non-commercial, and by any
// means.
// 
// In jurisdictions that recognize copyright laws, the author or authors
// of this software dedicate any and all copyright interest in the
// software to the public domain. We make this dedication for the benefit
// of the public at large and to the detriment of our heirs and
// successors. We intend this dedication to be an overt act of
// relinquishment in perpetuity of all present and future rights to this
// software under copyright law.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
// 
// For more information, please refer to <http://unlicense.org>

// Notes:
//  - The achievements and leaderboards should already be created.
//  - Any languages you add here should already be activated in the console.
//  - And leaderboard that uses suffix/suffixSingular has to already have
//    that option enabled.
//  - Images still have to be manually uploaded.

// Known language codes:
// af,am,ar,az-AZ,be,bn-BD,bg,ca,cs-CZ,da-DK,de-DE,el-GR,en-AU,en-GB,en-US,
// es-419,es-ES,es-US,et,eu-ES,fa,fi-FI,fr-CA,fr-FR,gl-ES,hi-IN,hr,hu-HU,hy-AM,
// id,is-IS,it-IT,iw-IL,ja-JP,ka-GE,km-KH,ko-KR,kn-IN,ky-KG,lo-LA,lt,lv,mk-MK,
// ml-IN,mn-MN,mr-IN,ms,my-MM,ne-NP,nl-NL,no-NO,pl-PL,pt-BR,pt-PT,rm,ro,ru-RU,
// si-LK,sk,sl,sr,sv-SE,sw,ta-IN,te-IN,th,fil,tr-TR,uk,vi,zh-CN,zh-TW,zu

// Set gpgGameId to your Google Play Games application id:
var gpgGameId = 123456789012;

// Fill out/generate this achievements structure with all your localizations,
// here is an example:
var achievements =
[
{
    "id": "xxxxxxxxx-xxxxxxxx",
    "position": 1,
    "locales":
    [
    {
        "code": "de-DE",
        "title": "zirkelhafter bewusstseinszustand",
        "desc": "Meistere die erste Welle.",
    },
    {
        "code": "en-US",
        "title": "circular state of mind",
        "desc": "Beat the first wave.",
    },
    ],
},
{
    "id": "xxxxxxxxx-xxxxxxxx",
    "position": 2,
    "locales":
    [
    {
        "code": "de-DE",
        "title": "walzertakt",
        "desc": "Drehe dich erfolgreich um einen rotierenden Block.",
    },
    {
        "code": "en-US",
        "title": "spin class",
        "desc": "Successfully spin around a rotating block.",
    },
    ],
},
];

// Fill out/generate this leaderboards structure with all your localizations,
// here is an example:
var leaderboards =
[
{
    "id": "xxxxxxxxx-xxxxxxxx",
    "position": 1,
    "locales":
    [
    {
        "code": "de-DE",
        "title": "endlos-punkte",
        "suffix": "",
        "suffixSingular": "",
        "suffixMany": "",
    },
    {
        "code": "en-US",
        "title": "endless score",
        "suffix": "",
        "suffixSingular": "",
        "suffixMany": "",
    },
    ],
},
{
    "id": "xxxxxxxxx-xxxxxxxx",
    "position": 2,
    "locales":
    [
    {
        "code": "de-DE",
        "title": "endlos-epilog-punkte",
        "suffix": "",
        "suffixSingular": "",
        "suffixMany": "",
    },
    {
        "code": "en-US",
        "title": "epilogue endless score",
        "suffix": "",
        "suffixSingular": "",
        "suffixMany": "",
    },
    ],
},
];

// Navigate to the Google Play developer console and paste this entire file
// into the javascript console in Chrome.

// Important: If the script gets stuck, refresh the Google Play developer
// console page before doing anything else or trying again!

//-----------------------------------------------------------------------------

// Don't know why but this is needed otherwise we get a ReferenceError:
$ = $;
$$ = $$;

// Execute a list of operations. Each operation is executed repeatedly until it
// returns true, at which point the next operation is executed:
var doList = function (list)
{
    var i = 0;

    var intervalId = setInterval(function ()
    {
        if (i < list.length)
        {
            if (list[i]())
            {
                ++i;
            }
        }
        else
        {
            clearInterval(intervalId);
        }
    }, 1);
}

// Get the first element in a array that matches a predicate:
var first = function (arr, pred)
{
    var result = null;

    for (var i = 0; i < arr.length; ++i)
    {
        if (pred(arr[i], i, arr))
        {
            result = arr[i];
            break;
        }
    }

    return result;
}

var getSaveButton = function ()
{
    return first($$('button'), function (a)
    {
        return /^Save( as Draft)?\s*$/i.test(a.innerText);
    });
}

var getSavedButton = function ()
{
    return first($$('button'), function (a)
    {
        return /^Saved\s*$/i.test(a.innerText);
    });
}

var getNewButton = function ()
{
    return first($$('button'), function (a)
    {
        return /Add new (achievement|leaderboard)\s*$/i.test(a.innerText);
    });
}

var getLocaleButton = function ()
{
    return $('button[data-lang-code]');
}

var selectAchievement = function (achievement)
{
    return function ()
    {
        console.log("Switching to achievement " + achievement.id);
        window.location.hash = "#EditAchievementPlace:gt=" + gpgGameId + "&a=" + achievement.id;
        return true;
    }
}

var selectLeaderboard = function (leaderboard)
{
    return function ()
    {
        console.log("Switching to leaderboard " + leaderboard.id);
        window.location.hash = "#EditLeaderboardPlace:gt=" + gpgGameId + "&l=" + leaderboard.id;
        return true;
    }
}

var fillAchievement = function (achievement)
{
    return function ()
    {
        if ($$('.gwt-TextBox')[3] == null)
            return false;
        setText($$('.gwt-TextBox')[3], achievement.position);
        return true;
    }
}

var fillLeaderboard = function (achievement)
{
    return function ()
    {
        if ($$('.gwt-TextBox')[9] == null)
            return false;
        setText($$('.gwt-TextBox')[9], achievement.position);
        return true;
    }
}

var selectLanguage = function (lang)
{
    return function ()
    {
        var localeButton = getLocaleButton();
        if (localeButton == null)
            return false;
        console.log("Switching to locale " + lang.code);
        localeButton.setAttribute('data-lang-code', lang.code);
        localeButton.click();
        return true;
    }
}

var setText = function (o, value)
{
    if (o != null)
    {
        o.value = value;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true);
        o.dispatchEvent(evt);
    }
}

var fillAchievementLanguage = function (lang)
{
    return function ()
    {
        if ($$('.gwt-TextBox')[0] == null || $$('.gwt-TextArea')[0] == null)
            return false;
        setText($$('.gwt-TextBox')[0], lang.title);
        setText($$('.gwt-TextArea')[0], lang.desc);
        return true;
    }
}

var fillLeaderboardLanguage = function (lang)
{
    return function ()
    {
        if ($$('.gwt-TextBox')[0] == null || $$('.gwt-TextBox')[6] == null || $$('.gwt-TextBox')[2] == null)
            return false;
        setText($$('.gwt-TextBox')[0], lang.title);

        if (lang.suffix || lang.suffixSingular || lang.suffixMany)
        {
            first($$('a'), function (a) { return a.innerText == "Add custom unit"; }).click();
            setText($$('.gwt-TextBox')[6], lang.suffix);
            setText($$('.gwt-TextBox')[2], lang.suffixSingular);
            setText($$('.gwt-TextBox')[5], lang.suffixMany);
        }
        else
        {
            first($$('a'), function (a) { return a.innerText == "Remove custom unit"; }).click();
        }
        return true;
    }
}

var save = function ()
{
    return function ()
    {
        var b = getSaveButton();
        if (!b)
            return false;
        b.click();
        return true;
    }
}

var waitForSaved = function ()
{
    return function ()
    {
        // Drafts save in place, otherwise they go back to the list:
        write("Waiting for save...")
        return getSavedButton() || getNewButton();
    }
}

var write = function (s)
{
    return function ()
    {
        console.log(s);
        return true;
    }
}

//-----------------------------------------------------------------------------

// Reverse sort the achievements and leaderboards by their position,
// so they're put in the correct order when we do the batch operation:
achievements.sort(function (a, b) { return b.position - a.position; });
leaderboards.sort(function (a, b) { return b.position - a.position; });

var list = [];
list.push(write("START!"));

achievements.forEach(function (achievement)
{
    list.push(selectAchievement(achievement));

    achievement.locales.forEach(function (lang)
    {
        list.push(selectLanguage(lang));
        list.push(fillAchievementLanguage(lang));
    });

    list.push(fillAchievement(achievement));
    list.push(write("Saving..."));
    list.push(save());
    list.push(waitForSaved());
    list.push(write("Saved"));
});

leaderboards.forEach(function (leaderboard)
{
    list.push(selectLeaderboard(leaderboard));

    leaderboard.locales.forEach(function (lang)
    {
        list.push(selectLanguage(lang));
        list.push(fillLeaderboardLanguage(lang));
    });

    list.push(fillLeaderboard(leaderboard));
    list.push(write("Saving..."));
    list.push(save());
    list.push(waitForSaved());
    list.push(write("Saved"));
});

list.push(write("DONE!"));

doList(list);
