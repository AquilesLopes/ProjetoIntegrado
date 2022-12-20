package br.com.validatecaepi.service;

import br.com.validatecaepi.builder.CaepiBuilder;
import br.com.validatecaepi.dto.CaepiDto;
import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.repository.CaepiRepository;
import br.com.validatecaepi.service.exception.DataIntegrityException;
import br.com.validatecaepi.service.exception.ObjectNotFoundException;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;

import java.util.List;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CaepiServiceTest {
    @InjectMocks
    CaepiService caepiService;

    @Mock
    CaepiRepository caepiRepo;

    @BeforeAll
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @BeforeEach
    void init() {}

    @Test
    void shouldReturnCaepiByNumber() {
        Caepi caepiMock = CaepiBuilder.createOne().builder();

        Mockito.doReturn(caepiMock).when(caepiRepo).findByNumber(caepiMock.getNumber());

        CaepiDto caepiDTO = caepiService.findByNumber(caepiMock.getNumber());

        Assertions.assertEquals(caepiMock.getNumber(), caepiDTO.getNumber());
        Assertions.assertEquals(caepiMock.getEquipment().getName(), caepiDTO.getEquipment().getName());
    }

    @Test
    void shouldThrowObjectNotFoundException() {
        Caepi caepiMock = CaepiBuilder.createOne().withNumber(0).builder();

        Mockito.doReturn(caepiMock).when(caepiRepo).findByNumber(caepiMock.getNumber());

        try {
            caepiService.findByNumber(caepiMock.getNumber());
            Assertions.fail("Should throw ObjectNotFoundException");
        } catch (ObjectNotFoundException e) {
            Assertions.assertEquals( "Certificate EPI not found", e.getMessage());
        }
    }

    @Test
    void shouldReturnCaepiDtoPageByLaboratory() {
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size, Sort.by("number").descending());
        List<Caepi> listCaepiMock = CaepiBuilder.createList(size);
        Page<Caepi> pageCaepiMock = new PageImpl<>(listCaepiMock);

        Mockito.doReturn(pageCaepiMock).when(caepiRepo).findByReportLaboratoryCnpj("97647098000105", pageable);

        Page<CaepiDto> pageCaepiBD = caepiService.findByLaboratory("97647098000105", page, size);

        Assertions.assertEquals(pageCaepiMock.getTotalElements(), pageCaepiBD.getTotalElements(), "Should return a Page<CaepiDTO> with 10 caepi");
    }

    @Test
    void shouldThrowDataIntegrityExceptionPageByLaboratory() {
        try {
            caepiService.findByLaboratory("97647098000105", 0, 21);
            Assertions.fail("Should throw a DataIntegrityException, because the maximum value for variable 'size' is 20");
        } catch (DataIntegrityException e) {
            Assertions.assertEquals("The maximum value for variable 'size' is 20", e.getMessage());
        }
        try {
            caepiService.findByLaboratory("97647098000105", 0, 2);
            Assertions.fail("Should throw a DataIntegrityException, because the minimum value for variable 'size' is 3");
        } catch (DataIntegrityException e) {
            Assertions.assertEquals( "The minimum value for variable 'size' is 3", e.getMessage());
        }
    }

    @Test
    void shouldReturnCaepiDtoPageByManufacturer() {
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size, Sort.by("number").descending());
        List<Caepi> listCaepiMock = CaepiBuilder.createList(size);
        Page<Caepi> pageCaepiMock = new PageImpl<>(listCaepiMock);

        Mockito.doReturn(pageCaepiMock).when(caepiRepo).findByEquipmentManufacturerCnpj("97647098000105", pageable);

        Page<CaepiDto> pageCaepiBD = caepiService.findByManufacturer("97647098000105", page, size);

        Assertions.assertEquals(pageCaepiMock.getTotalElements(), pageCaepiBD.getTotalElements(), "should return a Page<CaepiDTO> with 10 caepi");
    }

    @Test
    void shouldThrowDataIntegrityExceptionPageByManufacturer() {
        try {
            caepiService.findByManufacturer("97647098000105", 0, 21);
            Assertions.fail("Should throw a DataIntegrityException, because the maximum value for variable 'size' is 20");
        } catch (DataIntegrityException e) {
            Assertions.assertEquals("The maximum value for variable 'size' is 20", e.getMessage());
        }
        try {
            caepiService.findByManufacturer("97647098000105", 0, 2);
            Assertions.fail("Should throw a DataIntegrityException, because the minimum value for variable 'size' is 3");
        } catch (DataIntegrityException e) {
            Assertions.assertEquals("The minimum value for variable 'size' is 3", e.getMessage());
        }
    }

    @Test
    void shouldThrowDataIntegrityExceptionCnpj() {
        try {
            caepiService.findByLaboratory("12345111000111", 0, 10);
            Assertions.fail("Should throw a DataIntegrityException when an invalid CNPJ is informed");
        } catch (DataIntegrityException e) {
            Assertions.assertEquals("The CNPJ number is invalid", e.getMessage());
        }
        try {
            caepiService.findByManufacturer("12345111000111", 0, 10);
            Assertions.fail("Should throw a DataIntegrityException when an invalid CNPJ is informed");
        } catch (DataIntegrityException e) {
            Assertions.assertEquals("The CNPJ number is invalid", e.getMessage());
        }
    }


}
