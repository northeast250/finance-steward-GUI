head -1 VERSION.txt | perl -pe 's/(\d+)(\.)(\d+)(\.)(\d+)/$1.$2.$3.$4.($5+1)/e'
