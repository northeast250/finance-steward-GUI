perl -pi -pe 's/(\d+)\.(\d+)\.(\d+)/"$1.$2.".($3+1)/e' VERSION.txt
