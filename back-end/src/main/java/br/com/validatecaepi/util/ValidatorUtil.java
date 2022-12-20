package br.com.validatecaepi.util;

import java.util.regex.Pattern;

public class ValidatorUtil {

    public static boolean isEmailValid(String email){
        try{
            String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+
                    "[a-zA-Z0-9_+&*-]+)*@" +
                    "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                    "A-Z]{2,7}$";

            Pattern pat = Pattern.compile(emailRegex);
            return email != null ? pat.matcher(email).matches() : false;
        } catch (Exception e){
            return false;
        }
    }

}
