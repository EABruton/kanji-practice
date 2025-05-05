#!/bin/bash

# This script creates a new chapter of the book.
# It takes the chapter number as an argument and creates a new chapter with the given number.
# It then prompts the user for the replacement for each placeholder in the chapter.
# It then writes the final contents to a new file with the given chapter number.

templateFile="pages/template.html"
read -p "Enter the chapter number: " chapter_number
questions_file="kanji_files/kanji_ch_${chapter_number}.json"

if [ ! -f "$questions_file" ]; then
    echo "Questions file not found: $questions_file"
    exit 1
fi

if [ -f "ch_${chapter_number}.html" ]; then
    echo "Chapter file already exists: ch_${chapter_number}.html"
    exit 1
fi

questions=$(cat $questions_file)
contents=$(cat $templateFile)

final_contents=""

function replace_placeholder() {
    if [[ $1 =~ {.*} ]]; then
       line_matches=$(echo "$1" | grep -oE "{.*?}")
       new_line="${1}"

       while IFS= read -r match; do
        echo "MATCH: $match"
        read -p "Enter the replacement for $match: " replacement < /dev/tty
        new_line=$(echo "$new_line" | sed "s/$match/$replacement/")
       done <<< "$line_matches"

       final_contents+="$new_line"$'\n'
    elif [[ $1 =~ "<script id=\"questions\">" ]]; then
        # add the script tag and the questions
        final_contents+="$1"$'\n'
        final_contents+="$questions"$'\n'
    else
        final_contents+="$1"$'\n'
    fi
}

while IFS= read -r line; do
    replace_placeholder "$line"
done <<< "$contents"

echo "$final_contents" > "pages/ch_${chapter_number}.html"
npx prettier "pages/ch_${chapter_number}.html" --write
