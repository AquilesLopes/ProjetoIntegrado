package br.com.validatecaepi.test;

import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.service.BaseGovBrService;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.net.SocketException;
import java.time.LocalDateTime;
import java.util.List;

public class Test {

    public static void main (String[] args) throws SocketException, IOException {
        String fileName = "data_base_caepi.serializable";

        File file = ResourceUtils.getFile("classpath:templates/" + fileName);
        System.out.println("lastModified: " + file.getAbsolutePath());

        //LocalDateTime lastModified = BaseGovBrService.lastModifiedTimeBaseCaepiByGovBr();
        //System.out.println("lastModified: " + lastModified);

        //List<Caepi> arrList = BaseGovBrService.getBaseCaepi(lastModified);
        //saveFileListCaepi(arrList, fileName);

        //List<Caepi> arrList2 = readFileListCaepi(fileName);
        //System.out.println("List CAEPI: " + arrList2.size());
    }

    private static void saveFileListCaepi(List<Caepi> arrList, String fileName){
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

    private static List<Caepi> readFileListCaepi(String fileName){
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
