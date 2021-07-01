#!/bin/bash

function help_message() {
    echo "Usage: $0 -p <profile>"
    echo "profiles: restheart, microd"
}

if [ $# -ne 2 ]; then
    echo "Wrong number of parameters: $#"
    help_message
    exit 1
fi

CD="$( dirname "${BASH_SOURCE[0]}" )"/..
RH=$CD/.cache/restheart

opts_flag=0

while getopts ":p:" o; do
    case "${o}" in
        -?)
            help_message
            exit 0
            ;;
        p)
            profile=${OPTARG}
            case "${OPTARG}" in
                restheart)
                    curl -s -o /dev/null localhost:27017; mongodb_running=$?

                    if [ $mongodb_running != 0 ]; then
                        echo It looks like mongodb is not running on port 27017.
                        echo You can start it with:
                        echo \> docker-compose up -d
                        exit 1
                    fi

                    opts_flag=1
                    CONFIG_FILE=etc/restheart.yml
                    [ -f $RH/plugins/restheart-mongodb.disabled ] &&  mv $RH/plugins/restheart-mongodb.disabled $RH/plugins/restheart-mongodb.jar
                    ;;
                microd)
                    opts_flag=1
                    CONFIG_FILE=etc/microd.yml
                    [ -f $RH/plugins/restheart-mongodb.jar ] && mv $RH/plugins/restheart-mongodb.jar $RH/plugins/restheart-mongodb.disabled
                    ;;
                *)
                    help_message
                    exit 4
                    ;;
            esac
            ;;
        *)
            help_message
            exit 4
            ;;
    esac
done

[ $opts_flag -eq 0 ] && help_message && exit 2

if [ ! -d ".cache" ]
then
    echo **** Downloading RESTHeart..
    mkdir .cache && cd .cache
    curl -L https://gitreleases.dev/gh/softInstigate/restheart/latest/restheart.tar.gz --output restheart.tar.gz
    tar -xzf restheart.tar.gz
    cd ..
fi

cp $CD/etc/*.properties .cache/restheart/etc
cp $CD/etc/*.yml .cache/restheart/etc

echo Killing restheart
kill `lsof -t -i:8080` 2> /dev/null || echo .. > /dev/null

sleep 2

# per initializer
# echo Deploying plugin
# cp target/*.jar $RH/plugins
# cp target/lib/*.jar $RH/plugins

LOG_FILE=$CD/restheart.log

echo Starting restheart, check log with:
echo \> tail -f restheart.log
echo \> tail -f restheart.log \| awk \'/RESTHeart stopped/ \{ system\(\"./bin/notify_osx.sh RESTHeart stopped\"\) \} /RESTHeart started/ \{ system\(\"./bin/notify_osx.sh RESTHeart restarted\"\) \}  /.*/\'

RH_LOG_FILE_PATH=$LOG_FILE java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:4000 -Dlogback.configurationFile=etc/logback.xml -jar $RH/restheart.jar $RH/$CONFIG_FILE -e $RH/etc/dev.properties > /dev/null &
