FOLDER="../api"
DEFAULT="insecure"
SECURE_DEFAULT="secure"


#input for directory and route category
if [[ -n $1 ]]; then
    FOLDER="../$1"
fi
if [[ -n $2 ]]; then
    DEFAULT=$2
fi
if [[ -n $3 ]]; then
    SECURE_DEFAULT=$3
fi

#folder cleaning
if [ -d $FOLDER ]; then
echo $FOLDER
read -p "Folder exists, destroy? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1
rm -r $FOLDER
fi

#makes directory and echos into the defaults
mkdir $FOLDER
if ! [ -d "$FOLDER/controllers" ]; then 
    mkdir $FOLDER/controllers $FOLDER/controllers/auth $FOLDER/routes $FOLDER/routes/auth $FOLDER/utils $FOLDER/views  $FOLDER/middleware $FOLDER/manifest
fi

touch $FOLDER/app.js $FOLDER/controllers/$DEFAULT.js $FOLDER/routes/$DEFAULT.js $FOLDER/middleware/routing.js $FOLDER/utils/helperFunctions.js $FOLDER/utils/logger.js $FOLDER/manifest/error.log

#app echo
cat ./templateAPI/app.js > $FOLDER/app.js

#insecure routes echo
cat ./templateAPI/routes/category.js > $FOLDER/routes/$DEFAULT.js
cat ./templateAPI/controllers/category.js > $FOLDER/controllers/$DEFAULT.js

#middleware echo
cat ./templateAPI/middleware/organization.js > $FOLDER/middleware/organization.js

#utils echo
cat ./templateAPI/utils/helperFunctions.js > $FOLDER/utils/helperFunctions.js
cat ./templateAPI/utils/logger.js > $FOLDER/utils/logger.js


#secure routes echo
cat ./templateAPI/routes/auth/secureCategory.js > $FOLDER/routes/auth/$SECURE_DEFAULT.js
cat ./templateAPI/controllers/auth/secureCategory.js > $FOLDER/controllers/auth/$SECURE_DEFAULT.js

#setup npm and cleanup package
cd $FOLDER
npm init -y

cp ../skeleton/templateAPI/package.json ./
npm install
