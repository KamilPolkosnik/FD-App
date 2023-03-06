
const emailPattern = new RegExp('^[A-z0-9._%+-]+@[a-z0-9-]+([.][a-z]{2,4})+$');
const passwordPattern = new RegExp(
    '(?=^.{8,16}$)((?=.*\\d)(?=.*\\W)|(?=.*_))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
);
const numberPattern = new RegExp('^[0-9]*$')

export { emailPattern, passwordPattern, numberPattern };
