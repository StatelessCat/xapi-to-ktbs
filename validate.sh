#!/usr/bin/env bash
for input in ./resources/in-normalized/*.n3;
do
 id=`echo $input | sed 's/.*eval-\(.*\)-in-normalized.n3.*/\1/g'`
 echo "-------"
 echo "Processing $id statement";
 outputpath="./resources/out-framed-normalized/eval-"$id"-out-framed-normalized.n3"
 ~/Downloads/rdfdiff $input $outputpath
done