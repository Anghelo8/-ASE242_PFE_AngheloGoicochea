package pe.edu.vallegrande.service;

import org.springframework.stereotype.Service;
import pe.edu.vallegrande.model.Producto;
import pe.edu.vallegrande.repository.ProductoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> listar() {
        return repository.findAll();
    }

    public Optional<Producto> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Producto guardar(Producto producto) {
        return repository.save(producto);
    }

    public Producto actualizar(Long id, Producto producto) {
        if (repository.existsById(id)) {
            producto.setId(id);
            return repository.save(producto);
        }
        return null;
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
