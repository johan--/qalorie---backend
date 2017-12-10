#!/usr/bin/env bash

if [[ "$(which -s yuml)" == "0" ]]
then
    echo No yuml cli found.
    echo Use this and try again:
    echo sudo pip install https://github.com/wandernauta/yuml/zipball/master
    exit 1
else
    yuml -s plain -i static_model.eyuml -o static_model.png && open static_model.png
fi
