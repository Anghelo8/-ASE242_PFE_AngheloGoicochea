package pe.edu.vallegrande.controller;

import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.model.Venta;
import pe.edu.vallegrande.service.VentaService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping
    public Venta registrar(@RequestBody Venta venta) {
        return ventaService.registrarVenta(venta);
    }

    @GetMapping
    public List<Venta> listar() {
        return ventaService.listarVentas();
    }
}
