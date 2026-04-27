package travel.exploration.local.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import travel.exploration.local.model.Gem;
import travel.exploration.local.service.GemService;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GemController.class)
class GemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private GemService gemService;

    @Test
    void testReadAllGems() throws Exception {
        Gem gem = new Gem();
        gem.setId(1L);
        gem.setTitle("Lake Ella");
        gem.setDescription("Local outdoor gem");
        gem.setLatitude(30.45);
        gem.setLongitude(-84.28);

        when(gemService.findAllGems()).thenReturn(List.of(gem));

        mockMvc.perform(get("/api/gems"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Lake Ella"));
    }

    @Test
    @WithMockUser
    void testAuthenticatedCreateGem() throws Exception {
        Gem savedGem = new Gem();
        savedGem.setId(1L);
        savedGem.setTitle("New Gem");
        savedGem.setDescription("Created during test");
        savedGem.setLatitude(30.45);
        savedGem.setLongitude(-84.28);

        when(gemService.saveGem(any(Gem.class))).thenReturn(savedGem);

        mockMvc.perform(post("/api/gems")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "New Gem",
                                  "description": "Created during test",
                                  "latitude": 30.45,
                                  "longitude": -84.28
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Gem"));
    }

    @Test
    @WithMockUser
    void testAuthenticatedUpdateGem() throws Exception {
        Gem updatedGem = new Gem();
        updatedGem.setId(1L);
        updatedGem.setTitle("Updated Gem");
        updatedGem.setDescription("Updated test description");
        updatedGem.setLatitude(30.50);
        updatedGem.setLongitude(-84.30);

        when(gemService.updateGem(eq(1L), any(Gem.class))).thenReturn(updatedGem);

        mockMvc.perform(put("/api/gems/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Updated Gem",
                                  "description": "Updated test description",
                                  "latitude": 30.50,
                                  "longitude": -84.30
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Gem"));
    }

    @Test
    @WithMockUser
    void testAuthenticatedDeleteGem() throws Exception {
        doNothing().when(gemService).deleteGemById(1L);

        mockMvc.perform(delete("/api/gems/1"))
                .andExpect(status().isOk());
    }
}