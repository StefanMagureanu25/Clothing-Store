import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<any>;

  private cartProductsSubject = new BehaviorSubject<Product[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();
  
  private totalCartPriceSubject = new BehaviorSubject<number>(0);
  totalCartPrice$ = this.totalCartPriceSubject.asObservable();

  constructor(private firestore: AngularFirestore) {
    this.productsCollection = this.firestore.collection('products');
  }

  async addProducts(): Promise<void> {
    try {
      const products = [
        {
          name: 'Tricou puma',
          gender: 'Barbat',
          color: 'Gri',
          description: 'Tricou puma de cea mai mare calitate.',
          price: 15.99,
          size: 'M',
          imageUrl: '../assets/placeholders/tricou-puma.jpg'
        },
        {
          name: 'Pantaloni nike',
          gender: 'Barbat',
          color: 'Negru',
          description: 'Purtati de maxim 3 ori la sintetic cu baietii.',
          price: 23.99,
          size: 'L',
          imageUrl: '../assets/placeholders/pantaloni-nike.jpg'
        },
        {
          name: 'Hanorac Victoria\'s Secret',
          gender: 'Femeie',
          color: 'Roz',
          description: 'Vine la pachet si cu o crema de corp Victoria\'s Secret.',
          price: 35.99,
          size: 'S',
          imageUrl: '../assets/placeholders/hanorac-victoria\'s-secret.jpg'
        },
        {
          name: 'Blugi Levi\'s',
          gender: 'Barbat',
          color: 'Negru',
          description: 'Au fost purtati o singura data la Beraria H.',
          price: 75.99,
          size: 'L',
          imageUrl: '../assets/placeholders/blugi-levi\'s.jpg'
        },
        {
          name: 'Tricou Karl Lagerfeld',
          gender: 'Femeie',
          color: 'Alb',
          description: 'L-am primit cadou si nu mi-a placut.',
          price: 49.99,
          size: 'S',
          imageUrl: '../assets/placeholders/tricou-karl-lagerfeld.jpg'
        }
      ];

      const collectionRef = this.firestore.collection('products');
      for (const product of products) {
        await collectionRef.add(product);
      }
    } catch (error) {
      console.error('Error adding products:', error);
      throw error;
    }
  }

  getAllProducts(): Observable<any[]> {
    return this.productsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        throw error;
      })
    );
  }

  getProductById(id: string): Observable<any> {
    return this.productsCollection.doc(id).valueChanges().pipe(
      catchError(error => {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
      })
    );
  }

  async updateProduct(id: string, updates: any): Promise<void> {
    try {
      await this.productsCollection.doc(id).update(updates);
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.productsCollection.doc(id).delete();
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }

  addToCart(product: Product): void {
    const currentCartItems = this.cartProductsSubject.value;
    const updatedCartItems = [...currentCartItems, product];
    this.cartProductsSubject.next(updatedCartItems);

      const totalCartPrice = updatedCartItems.reduce((total, item) => total + item.price, 0);
      this.totalCartPriceSubject.next(totalCartPrice);
    }

  deleteFromCart(product: Product) {
    const currentCartItems = this.cartProductsSubject.value;
    const updatedCartItems = currentCartItems.filter(item => item !== product);
    this.cartProductsSubject.next(updatedCartItems);

    const totalCartPrice = updatedCartItems.reduce((total, item) => total + item.price, 0);
    this.totalCartPriceSubject.next(totalCartPrice);
  }
}
