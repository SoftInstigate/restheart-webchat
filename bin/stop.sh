#!/bin/bash

echo Killing restheart
kill `lsof -t -i:8080` 2> /dev/null || echo .. > /dev/null
