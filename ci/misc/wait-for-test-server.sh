#!/usr/bin/env bash

statusFile=./port-status
while [[ true ]]; do
  curl 127.0.0.1:8080 &> ${statusFile}
  status=$(grep "<!DOCTYPE html>" ${statusFile} | wc -l)
  echo "Status: $status"

  if [[ "${status}" -eq 1 ]]; then
    rm ${statusFile}
    echo "Port open, ready to proceed"
    break;
  else
    echo "Port not open, waiting."
    sleep 10
  fi
done
