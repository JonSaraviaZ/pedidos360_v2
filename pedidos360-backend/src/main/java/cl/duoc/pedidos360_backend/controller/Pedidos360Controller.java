package cl.duoc.pedidos360_backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import java.util.Map;
import java.util.HashMap;



@RestController 
public class Pedidos360Controller {

    @GetMapping("/api/pedidos")
    public List<Map<String, Object>> obtenerPedidos(){
        return List.of(Map.of(
            "id", 1,
            "cliente", "Juan Pérez",
            "producto", "Notebook",
            "cantidad", 5,
            "estado", "EN_PREPARACION"
        ),
        Map.of(
            "id", 2,
            "cliente", "María González",
            "producto", "IPhone 18 Pro Max",
            "cantidad", 3,
            "estado", "ENVIADO"
        ),
        Map.of(
            "id", 3,
            "cliente", "Juan Cerda",
            "producto", "Nokia N95",
            "cantidad", 3,
            "estado", "DISPONIBLE"
        )
    );
    }

};