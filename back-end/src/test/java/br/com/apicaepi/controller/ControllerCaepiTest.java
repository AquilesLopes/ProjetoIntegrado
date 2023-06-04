package br.com.apicaepi.controller;

import br.com.apicaepi.builder.CaepiBuilder;
import br.com.apicaepi.dto.CaepiDto;
import br.com.apicaepi.model.Caepi;
import br.com.apicaepi.repository.CaepiRepository;
import br.com.apicaepi.service.CaepiService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringJUnitConfig
@WebMvcTest(controllers = ControllerCaepi.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ControllerCaepiTest {

    @Mock
    private CaepiRepository caepiRepo;

    @MockBean
    CaepiService caepiService;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @WithAnonymousUser
    void shouldThrowsHttpStatus401Unauthorized() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                        .get("/api/v1/caepi/{number}", 8000)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username="admin",roles={"USER","ADMIN"})
    void shouldReturnResponseEntityCaepiByNumber() throws Exception {
        Caepi caepiMock = CaepiBuilder.createOne().builder();

        Mockito.when(caepiRepo.findByNumber(caepiMock.getNumber())).thenReturn(caepiMock);
        Mockito.when(caepiService.findByNumber(caepiMock.getNumber())).thenReturn(new CaepiDto(caepiMock));

        mockMvc.perform( MockMvcRequestBuilders
                        .get("/api/v1/caepi/{number}", caepiMock.getNumber())
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.number").value("8000"))
                .andExpect(jsonPath("$.status").value("VALIDO"));
    }






















}
