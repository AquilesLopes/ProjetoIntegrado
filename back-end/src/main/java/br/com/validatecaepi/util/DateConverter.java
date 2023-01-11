package br.com.validatecaepi.util;

import java.nio.file.Files;
import java.nio.file.attribute.FileTime;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateConverter {

    public static LocalDate strToLocalDate(String value, String pattern){
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
            return LocalDate.parse(value, formatter);
        }catch (Exception e) {
            return null;
        }
    }

    public static LocalDateTime strToLocalDateTime(String value, String pattern){
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
            return LocalDateTime.parse(value, formatter);
        }catch (Exception e) {
            return null;
        }
    }

    public static LocalDateTime fileTimeToLocalDateTime(FileTime fileTime){
        try{
            LocalDateTime now = LocalDateTime.now();
            return LocalDateTime.ofInstant(fileTime.toInstant(), ZoneId.systemDefault());
        }catch (Exception e) {
            return null;
        }
    }

    public static LocalDateTime dateTimeToLocalDateTime(Date date){
        try{
            LocalDateTime now = LocalDateTime.now();
            return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
        }catch (Exception e) {
            return null;
        }
    }

    public static LocalDateTime formatDateFromFtp(String strDate, String strTime){
        String HH = "";
        String mm = "";
        String meridian = "";

        try{
            HH = strTime.substring(0, 2);
            mm = strTime.substring(3, 5);
            meridian = strTime.substring(5, 7);
        }catch (Exception e) {
            HH = "00";
            mm = "00";
            meridian = "";
        }

        strDate += " " + HH + ":" + mm + ":00";

        LocalDateTime date = strToLocalDateTime(strDate, "MM-dd-yy HH:mm:ss");

        if(meridian.equalsIgnoreCase("PM")){
            date = date.plusHours(12);
        }

        return date;
    }

}
