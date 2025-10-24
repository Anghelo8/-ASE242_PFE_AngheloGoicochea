package pe.edu.vallegrande.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.vallegrande.model.*;
import pe.edu.vallegrande.repository.*;

import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepo;
    private final ProductoRepository productoRepo;
    private final ClienteRepository clienteRepo;

    public VentaService(VentaRepository ventaRepo, ProductoRepository productoRepo, ClienteRepository clienteRepo) {
        this.ventaRepo = ventaRepo;
        this.productoRepo = productoRepo;
        this.clienteRepo = clienteRepo;
    }

    @Transactional
    public Venta registrarVenta(Venta venta) {
        // ✅ Obtener cliente desde el ID enviado
        Long clienteId = venta.getCliente() != null ? venta.getCliente().getId() : null;
        if (clienteId == null) {
            throw new RuntimeException("Falta el clienteId en la venta");
        }

        Cliente cliente = clienteRepo.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID " + clienteId));

        venta.setCliente(cliente);

        // ✅ Procesar los detalles
        if (venta.getDetalles() == null || venta.getDetalles().isEmpty()) {
            throw new RuntimeException("La venta debe tener al menos un detalle.");
        }

        venta.getDetalles().forEach(detalle -> {
            Producto producto = productoRepo.findById(detalle.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID " + detalle.getProducto().getId()));

            if (producto.getStock() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            producto.setStock(producto.getStock() - detalle.getCantidad());
            productoRepo.save(producto);

            detalle.setProducto(producto);
            detalle.setVenta(venta);
        });

        // ✅ Guardar la venta y devolverla
        return ventaRepo.save(venta);
    }

    public List<Venta> listarVentas() {
        return ventaRepo.findAll();
    }
}
