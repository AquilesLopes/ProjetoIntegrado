package br.com.validatecaepi.service;

import br.com.validatecaepi.model.Caepi;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.util.List;

@Service
public class BaseCaepiSerializableService {
    public static void saveFileListCaepi(List<Caepi> arrList, String fileName){
        try {
            File file = ResourceUtils.getFile("classpath:templates/" + fileName);

            FileOutputStream fos = new FileOutputStream(file.getAbsoluteFile());
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(arrList);
            oos.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static List<Caepi> readFileListCaepi(String fileName){
        List<Caepi> list = null;
        try {
            File file = ResourceUtils.getFile("classpath:templates/" + fileName);

            FileInputStream fis = new FileInputStream(file.getAbsoluteFile());
            ObjectInputStream ois = new ObjectInputStream(fis);
            list = (List<Caepi>) ois.readObject();
            ois.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
