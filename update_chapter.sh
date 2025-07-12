#!/bin/bash

# This script

read -p "Enter the chapter to update: " chapter_number
file_name="pages/ch_${chapter_number}.html"

if [ ! -f "${file_name}" ]; then
  echo "No file to update"
  exit 1
fi

rm "$file_name"

echo $chapter_number | ./new_chapter.sh
