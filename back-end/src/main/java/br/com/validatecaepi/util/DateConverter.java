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

}
