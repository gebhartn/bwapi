#!/bin/bash

read -r -p "Drop tables and write schema? [y/N] " answer
if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
  echo -e "\nScram!"
else
  psql -h ${POSTGRES_DOMAIN} -d ${DATABASE_NAME} -U ${POSTGRES_USERNAME} -f drop.sql && \
  psql -h ${POSTGRES_DOMAIN} -d ${DATABASE_NAME} -U ${POSTGRES_USERNAME} -f schema.sql
fi



