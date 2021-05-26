#EMIT

Website by Sonya.Nina
Starter theme imported from Fur by CloudCannn.







## Fur

E-commerce template for Jekyll. Browse through a [live demo](https://turquoise-rook.cloudvent.net).

![Fur template screenshot](images/_screenshot.png)

Fur was made by [CloudCannon](http://cloudcannon.com/), the Cloud CMS for Jekyll.

Find more templates, themes and Jekyll tutorials at [CloudCannon Academy](https://learn.cloudcannon.com/).

## Features

* List product with multiple colours and sizes
* Contact form
* Optimised for editing in [CloudCannon](http://cloudcannon.com/)
* RSS/Atom feed
* SEO tags
* Google Analytics

## Setup

1. Add your site and author details in `_config.yml`.
2. Add your Google Analytics, Google Maps API key to `_config.yml`.
3. Get a workflow going to see your site's output (with [CloudCannon](https://app.cloudcannon.com/) or Jekyll locally).

## Develop

built with [Jekyll](http://jekyllrb.com/) version 3.4.3, but should support newer versions as well.

Install the dependencies with [Bundler](http://bundler.io/):

~~~bash
$ bundle install
~~~

Run `jekyll` commands through Bundler to ensure you're using the right versions:

~~~bash
$ bundle exec jekyll serve --livereload
~~~

Sonya: from https://stackoverflow.com/questions/51126403/you-dont-have-write-permissions-for-the-library-ruby-gems-2-3-0-directory-ma

** SONYA - USE THIS WHEN YOU RESTART VISUAL STUDIO TO CHANGE THE SOURCE OF RUBY
source ~/.bash_profile

To check that you're now using the non-system version of Ruby, you can run the following commands:

which ruby
It should be something other than /usr/bin/ruby

ruby -v