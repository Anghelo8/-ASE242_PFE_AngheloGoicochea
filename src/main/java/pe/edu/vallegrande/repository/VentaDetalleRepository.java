package pe.edu.vallegrande.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.vallegrande.model.DetalleVenta;

public interface VentaDetalleRepository extends JpaRepository<DetalleVenta, Long> {
}
