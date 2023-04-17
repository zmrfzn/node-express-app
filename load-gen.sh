#!/bin/sh

URL=http://fullstack-js-o11y.$_SANDBOX_ID.instruqt.io:8080/api/tutorials
URL2=http://fullstack-js-o11y.$_SANDBOX_ID.instruqt.io:8080/api/tutorials/categories

npx load-generator --workers 4 --pause 5000 "$URL" "$URL2" -p