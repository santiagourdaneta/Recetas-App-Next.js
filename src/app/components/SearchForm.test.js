import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';
import { useRouter } from 'next/navigation';

// Mock de useRouter para simular la navegación en las pruebas
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchForm', () => {
  it('renderiza el input de búsqueda y el botón', () => {
    // Renderiza el componente en un entorno de prueba virtual
    render(<SearchForm />);

    // Busca el campo de entrada (input) por su etiqueta ARIA
    const inputElement = screen.getByLabelText('Campo de búsqueda de recetas');
    
    // Busca el botón por su etiqueta ARIA
    const buttonElement = screen.getByLabelText('Buscar recetas');
    
    // Asegura que ambos elementos estén en el documento
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('actualiza el valor del input cuando el usuario escribe', () => {
    render(<SearchForm />);
    
    const inputElement = screen.getByLabelText('Campo de búsqueda de recetas');
    
    // Simula que el usuario escribe "pizza" en el input
    fireEvent.change(inputElement, { target: { value: 'pizza' } });
    
    // Verifica que el valor del input haya cambiado a "pizza"
    expect(inputElement.value).toBe('pizza');
  });

  it('llama a router.push con la query correcta cuando se envía el formulario', () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    
    render(<SearchForm />);
    
    const inputElement = screen.getByLabelText('Campo de búsqueda de recetas');
    const formElement = screen.getByRole('form');
    
    // Escribe un término de búsqueda
    fireEvent.change(inputElement, { target: { value: 'pizza' } });
    
    // Envía el formulario
    fireEvent.submit(formElement);
    
    // Verifica que router.push fue llamado con el valor correcto
    expect(mockPush).toHaveBeenCalledWith('/?q=pizza');
  });
});

