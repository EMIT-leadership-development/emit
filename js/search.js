---
layout: null
---
(function () {
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1),
			vars = query.split("&");

		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");

			if (pair[0] === variable) {
				return decodeURIComponent(pair[1].replace(/\+/g, '%20')).trim();
			}
		}
    }

	function getPreview(query, content, previewLength, filteredKey) {
        previewLength = previewLength || (content.length * 2);

        console.log(query);

		var parts = query.split(" "),
			match = content.toLowerCase().indexOf(query.toLowerCase()),
			matchLength = query.length,
			preview;

		// Find a relevant location in content
		for (var i = 0; i < parts.length; i++) {
			if (match >= 0) {
				break;
			}

			match = content.toLowerCase().indexOf(parts[i].toLowerCase());
			matchLength = parts[i].length;
		}

		// Create preview
		if (match >= 0) {
			var start = match - (previewLength / 2),
				end = start > 0 ? match + matchLength + (previewLength / 2) : previewLength;

			preview = content.substring(start, end).trim();

			if (start > 0) {
				preview = "..." + preview;
			}

			if (end < content.length) {
				preview = preview + "...";
			}

			// Highlight query parts
			preview = preview.replace(new RegExp("(" + parts.join("|") + ")", "gi"), "<strong>$1</strong>");
		} else {
			// Use start of content if no match found
			preview = content.substring(0, previewLength).trim() + (content.length > previewLength ? "..." : "");
		}

		return preview;
	}

	function displaySearchResults(results, query, descriptor) {
        if (descriptor == "category") {
            var phrase = "posts categorised as "
        } else if (descriptor == "tags") {
            var phrase = "posts tagged with "
        } else {
            phrase = "results for "
        }

		var searchResultsEl = document.getElementById("search-results"),
            searchProcessEl = document.getElementById("search-process");
            searchDescription = document.getElementById("descriptor");

		if (results.length) {
			var resultsHTML = "";
			results.forEach(function (result) {

				var item = window.data[result.ref],
					contentPreview = getPreview(query, item.content, 170),
                    titlePreview = getPreview(query, item.title);

                /**
                 * Wraps a string around each word
                 *
                 * @param {string} str The string to transform
                 * @param {string} tmpl Template that gets interpolated
                 * @returns {string} The given input splitted by words
                 */
                function wrapWords(str, tmpl) {
                    return str.replace(/\S+/g, tmpl || "<span>$&</span>");
                }
                var tagshtml = wrapWords(item.tags);

                resultsHTML += "<article class='postPreview'><div class='postWrap'><div class='postImageWrap'><div class='postImage' style='background-image:url(" + item.pic + "); background-position: 0 " + item.position + "%;'></div></div><div class='postContent'><h4 class='postTitle'><a href='{{ site.baseurl }}" + item.url.trim() + "'>" + titlePreview + "</a></h4><p class='postSubtitle'>" + contentPreview + "</p>";
                resultsHTML += "<div class='tagsCluster'>" + tagshtml + "</div>";
                resultsHTML += "</div><div class='postActions'><div class='category'>" + item.category + "</div><a href='{{ site.baseurl }}" + item.url.trim() + "' class='button secondary'>Read more</a></div></div></article>";

			});

			searchResultsEl.innerHTML = resultsHTML;
            searchProcessEl.innerText = "Showing";
            searchDescription.innerText = phrase;
		} else {
			searchResultsEl.style.display = "none";
			searchProcessEl.innerText = "No";
		}
    }

	window.index = lunr(function () {
        this.tokenizer.separator = /[\s]+/;

		this.field("id");
		this.field("title", {boost: 10});
        this.field("category", {boost: 10});
        this.field("tags");
		this.field("url");
        this.field("content");
        for (var key in window.data) {
            this.add(window.data[key]);
        }
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var searchKeyParam = urlParams.get('k');

	var query = decodeURIComponent((getQueryVariable("q") || "").replace(/\+/g, "%20")),
		searchQueryContainerEl = document.getElementById("search-query-container"),
        searchQueryEl = document.getElementById("search-query");
        searchQueryEl.innerText = query;
        searchQueryContainerEl.style.display = "inline";

    if (searchKeyParam) {
        var lowerquery = query.toLowerCase();
        var queryResults = window.index.query(function () {
            this.term(lowerquery, {
                fields: [searchKeyParam]
            });
        })
        displaySearchResults(queryResults, query, searchKeyParam); // Hand the results off to be displayed
    } else {
        displaySearchResults(window.index.search(query), query); // Hand the results off to be displayed
    }

})();