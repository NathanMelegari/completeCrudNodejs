#!bin/bash

#----------------------------
# VARIABLES
#----------------------------
database_name="compl-crud-db"


#----------------------------
# LOGIC TO RUN DATABASE
#----------------------------
echo "Initialize MariaDB server..."


if win; then
	wt new-tab -p "Command Prompt"
elif macos; then
	open -n -a Terminal &
else
	gnome-terminal -- mysqlinit
fi

echo "Accessing $database database"
