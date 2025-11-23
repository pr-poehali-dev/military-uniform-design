import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  reviews: Review[];
}

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' });

  const products: Product[] = [
    {
      id: 1,
      name: 'Минималистичные наушники',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 4.8,
      reviewCount: 24,
      category: 'electronics',
      reviews: [
        { id: 1, author: 'Алексей', rating: 5, comment: 'Отличное качество звука, очень доволен покупкой!', date: '2024-01-15' },
        { id: 2, author: 'Мария', rating: 4, comment: 'Хороший продукт за свою цену', date: '2024-01-10' }
      ]
    },
    {
      id: 2,
      name: 'Смарт-часы Premium',
      price: 24990,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4.6,
      reviewCount: 18,
      category: 'electronics',
      reviews: [
        { id: 3, author: 'Дмитрий', rating: 5, comment: 'Стильные и функциональные', date: '2024-01-12' }
      ]
    },
    {
      id: 3,
      name: 'Кожаный рюкзак',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      rating: 4.9,
      reviewCount: 32,
      category: 'accessories',
      reviews: [
        { id: 4, author: 'Елена', rating: 5, comment: 'Качественная кожа, удобный', date: '2024-01-08' }
      ]
    },
    {
      id: 4,
      name: 'Беспроводная мышь',
      price: 3990,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      rating: 4.5,
      reviewCount: 15,
      category: 'electronics',
      reviews: []
    },
    {
      id: 5,
      name: 'Дизайнерская сумка',
      price: 15990,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop',
      rating: 4.7,
      reviewCount: 28,
      category: 'accessories',
      reviews: []
    },
    {
      id: 6,
      name: 'Портативная колонка',
      price: 6990,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      rating: 4.4,
      reviewCount: 21,
      category: 'electronics',
      reviews: []
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'accessories', name: 'Аксессуары' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleSubmitReview = () => {
    if (!newReview.author || !newReview.comment) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Отзыв отправлен на модерацию');
    setNewReview({ author: '', rating: 5, comment: '' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name={star <= rating ? 'Star' : 'Star'}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Store</h1>
            <nav className="flex gap-8">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Качественные товары<br />с доставкой
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Минималистичный дизайн. Максимальное качество. Проверенные отзывы покупателей.
            </p>
            <Button size="lg" className="px-8" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог товаров</h2>
          
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                    <Badge variant="secondary" className="shrink-0">
                      {product.category === 'electronics' ? 'Электроника' : 'Аксессуары'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(Math.round(product.rating))}
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount} отзывов)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                    <Button size="sm" variant="outline">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    {renderStars(Math.round(selectedProduct.rating))}
                    <span className="text-lg font-medium">
                      {selectedProduct.rating} ({selectedProduct.reviewCount} отзывов)
                    </span>
                  </div>
                  
                  <p className="text-3xl font-bold text-primary mb-6">
                    {selectedProduct.price.toLocaleString()} ₽
                  </p>
                  
                  <Button size="lg" className="w-full mb-8">
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>

                  <Tabs defaultValue="reviews" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                      <TabsTrigger value="add-review">Написать отзыв</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reviews" className="space-y-4">
                      {selectedProduct.reviews.length > 0 ? (
                        selectedProduct.reviews.map((review) => (
                          <Card key={review.id} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold">{review.author}</p>
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-muted-foreground mb-2">{review.comment}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('ru-RU')}
                            </p>
                          </Card>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          Пока нет отзывов. Будьте первым!
                        </p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="add-review" className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                        <Input 
                          placeholder="Иван Иванов"
                          value={newReview.author}
                          onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Оценка</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="transition-transform hover:scale-110"
                            >
                              <Icon
                                name="Star"
                                size={32}
                                className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ваш отзыв</label>
                        <Textarea 
                          placeholder="Поделитесь своим мнением о товаре..."
                          rows={4}
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        />
                      </div>
                      
                      <Button onClick={handleSubmitReview} className="w-full">
                        Отправить отзыв
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section id="contact" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Свяжитесь с нами</h2>
            <p className="text-center text-muted-foreground mb-12">
              Есть вопросы? Мы всегда на связи и готовы помочь
            </p>
            
            <Card className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                  <Input placeholder="Иван Иванов" required />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="ivan@example.com" required />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <Textarea 
                    placeholder="Ваше сообщение..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© 2024 Store. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
