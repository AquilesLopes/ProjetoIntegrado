package br.com.apicaepi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Document(collection="info_data_base")
public class InfoDataBase implements Serializable {
        private static final long serialVersionUID = 1L;

        @Id
        private String id;

        private Long qtdManufacturer;

        private Long qtdLaboratory;

        private Long total;

        private Long minorNumber;

        private Long biggestNumber;

        LocalDateTime dateUpdate;
        Map<String,Integer> mapStatus = new HashMap<String,Integer>();
        Map<String,Integer> mapOrigin = new HashMap<String,Integer>();

        public InfoDataBase() {
                this.id = id;
                this.mapStatus.put("EXPIRED", 0);
                this.mapStatus.put("CANCELLED", 0);
                this.mapStatus.put("VALID", 0);
                this.mapStatus.put("SUSPENDED", 0);
                this.mapStatus.put("ISSUED", 0);

                this.mapOrigin.put("NATIONAL", 0);
                this.mapOrigin.put("IMPORTED", 0);

                this.minorNumber = Long.valueOf(999999999);
                this.biggestNumber = Long.valueOf(0);
        }

        public String getId() {
                return id;
        }

        public void setId(String id) {
                this.id = id;
        }

        public LocalDateTime getDateUpdate() {
                return dateUpdate;
        }

        public void setDateUpdate(LocalDateTime dateUpdate) {
                this.dateUpdate = dateUpdate;
        }

        public Map<String, Integer> getMapStatus() {
                return mapStatus;
        }

        public void setMapStatus(Map<String, Integer> mapStatus) {
                this.mapStatus = mapStatus;
        }

        public Map<String, Integer> getMapOrigin() {
                return mapOrigin;
        }

        public void setMapOrigin(Map<String, Integer> mapOrigin) {
                this.mapOrigin = mapOrigin;
        }

        public Long getQtdManufacturer() {
                return qtdManufacturer;
        }

        public void setQtdManufacturer(Long qtdManufacturer) {
                this.qtdManufacturer = qtdManufacturer;
        }

        public Long getQtdLaboratory() {
                return qtdLaboratory;
        }

        public void setQtdLaboratory(Long qtdLaboratory) {
                this.qtdLaboratory = qtdLaboratory;
        }

        public Long getTotal() {
                return total;
        }

        public void setTotal(Long total) {
                this.total = total;
        }

        public Long getMinorNumber() {
                return minorNumber;
        }

        public void setMinorNumber(Long minorNumber) {
                this.minorNumber = minorNumber;
        }

        public Long getBiggestNumber() {
                return biggestNumber;
        }

        public void setBiggestNumber(Long biggestNumber) {
                this.biggestNumber = biggestNumber;
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (!(o instanceof InfoDataBase)) return false;

                InfoDataBase that = (InfoDataBase) o;

                return getId() != null ? getId().equals(that.getId()) : that.getId() == null;
        }

        @Override
        public int hashCode() {
                return getId() != null ? getId().hashCode() : 0;
        }

        @Override
        public String toString() {
                return "InfoDataBase{" +
                        "id='" + id + '\'' +
                        ", qtdManufacturer=" + qtdManufacturer +
                        ", qtdLaboratory=" + qtdLaboratory +
                        ", total=" + total +
                        ", minorNumber=" + minorNumber +
                        ", biggestNumber=" + biggestNumber +
                        ", dateUpdate=" + dateUpdate +
                        ", mapStatus=" + mapStatus +
                        ", mapOrigin=" + mapOrigin +
                        '}';
        }
}
