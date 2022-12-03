#!/bin/sh
set -e

if [ -d "/home/${$0}" ]; then
  echo "Advent puzzle completed for day ${$0}"
  exec "/home/${$0}/answer.js"
else
  echo "Advent puzzle not completed yet for day ${$0}"
fi
