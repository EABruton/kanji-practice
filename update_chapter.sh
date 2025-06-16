#!/bin/bash

read -p "Enter the chapter to update: " chapter_number
file_name="pages/ch_${chapter_number}.html"

# cat << EOF
# ${chapter_number}
# EOF

if [ ! -f "${file_name}" ]; then
  echo "No file to update"
  exit 1
fi

rm "$file_name"

echo $chapter_number | ./new_chapter.sh
