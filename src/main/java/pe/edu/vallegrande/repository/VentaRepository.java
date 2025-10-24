package pe.edu.vallegrande.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.vallegrande.model.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {
}
