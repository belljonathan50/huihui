

pages : ../pages.inscore

../pages.inscore : dates.txt makepages.awk
	cat dates.txt | awk -v baseaddress='/ITL/scene/page_' -v location="pages/page_" -v cursor='/ITL/scene/cursor' -f makepages.awk > $@
