
function idate2smc(date) {
	sdate = date * 4;
	smin = int(sdate / 60);
	tmp  = smin * 60;
	ssec = int(sdate - tmp);
	scts = int ((sdate  - tmp - ssec) * 100);
	return smin ":" ssec ":" scts;
}

function makePage(i, date, duration, address, loc, cursor) {
	page = address i;
	print page " set img '" loc i ".png';"
	end = date + duration;
	print page " map '([54, 1103[ [52, 357[) ([" idate2smc(date) ", " idate2smc(end) "[)';"
	print cursor " watch timeEnter " date " " end " ( " ;
	print "  " address "* show 0,"
	print "  " page " show 1 ) ;"
	print page " duration " duration ";"
}

BEGIN {
	FS = ":";
}

END {
	print "\n" baseaddress  "* show 0;"
	print baseaddress  "01 show 1;"	
}


################# 
/^[0-9]/ {
	makePage($1, $2, $3, baseaddress, location, cursor);
}

/^fin/ {
	print cursor " watch timeEnter " $2 " " ($2 + 100) " ( /ITL/scene event STOP );" ;
}
