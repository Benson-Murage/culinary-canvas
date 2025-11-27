import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Toaster, toast } from 'sonner';
import { Calendar, Clock, MapPin, Users, UtensilsCrossed, Star, ChefHat, Gift, Music } from 'lucide-react';

const imageUrlMap: { [key: string]: string } = {
  '/images/jollof-rice.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/jollof-rice-6ej77k1-1764238263992.webp',
  '/images/injera-doro-wat.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/injera-doro-wat-v2ccdbt-1764238271495.webp',
  '/images/bunny-chow.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/bunny-chow-9g3yx90-1764238279117.webp',
  '/images/samosas.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/samosas-57zpcjd-1764238286322.webp',
  '/images/mandazi.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/mandazi-y5lfk72-1764238293359.webp',
  '/images/chef-tunde.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/chef-tunde-ziijhkh-1764238300855.webp',
  '/images/chef-abeba.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/chef-abeba-03rcwpo-1764238307869.webp',
  '/images/offer-jollof.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/offer-jollof-jgpsow3-1764238314982.webp',
  '/images/afrobeat-night.webp': 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/afrobeat-night-ihhp6up-1764238323206.webp'
};

export default function App() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [chefs, setChefs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [specialOffers, setSpecialOffers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: menuItemsData, error: menuError } = await supabase.from('menu_items').select('*');
      if (menuError) toast.error('Failed to load menu items.');
      else setMenuItems(menuItemsData);

      const { data: chefsData, error: chefsError } = await supabase.from('chefs').select('*');
      if (chefsError) toast.error('Failed to load chef profiles.');
      else setChefs(chefsData);

      const { data: reviewsData, error: reviewsError } = await supabase.from('reviews').select('*');
      if (reviewsError) toast.error('Failed to load reviews.');
      else setReviews(reviewsData);

      const { data: offersData, error: offersError } = await supabase.from('special_offers').select('*');
      if (offersError) toast.error('Failed to load special offers.');
      else setSpecialOffers(offersData);

      const { data: eventsData, error: eventsError } = await supabase.from('events').select('*');
      if (eventsError) toast.error('Failed to load events.');
      else setEvents(eventsData);
    };

    fetchData();
  }, []);

  const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reservationData = Object.fromEntries(formData.entries());
    
    toast.loading('Submitting your reservation...');
    const { error } = await supabase.from('reservations').insert([reservationData]);

    if (error) {
      toast.error(`Reservation failed: ${error.message}`);
    } else {
      toast.success('Reservation submitted successfully! We will contact you shortly to confirm.');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className='bg-stone-900 text-stone-50 min-h-screen font-serif'>
      <Toaster richColors position='top-center' />
      <header className='bg-stone-950/80 backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between p-4 px-8 shadow-lg shadow-stone-950/20'>
        <h1 className='text-3xl font-bold text-amber-400 tracking-wider'>Jollof Joy</h1>
        <nav className='flex items-center gap-6 text-lg'>
          <a href='#menu' className='hover:text-amber-400 transition-colors'>Menu</a>
          <a href='#chefs' className='hover:text-amber-400 transition-colors'>Chefs</a>
          <a href='#reviews' className='hover:text-amber-400 transition-colors'>Reviews</a>
          <a href='#contact' className='hover:text-amber-400 transition-colors'>Contact</a>
        </nav>
      </header>

      <main>
        <section id='hero' className='relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center' style={{backgroundImage: `url(${imageUrlMap['/images/offer-jollof.webp']})`}}>
            <div className='absolute inset-0 bg-black/60'></div>
            <div className='relative z-10 space-y-4'>
                <h2 className='text-6xl font-extrabold text-white leading-tight'>Taste of Africa, Heart of the City</h2>
                <p className='text-xl text-stone-300'>Experience authentic flavors from across the continent.</p>
                <a href='#reservation' className='inline-block bg-amber-500 text-stone-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-400 transition-transform hover:scale-105 shadow-lg'>Book a Table</a>
            </div>
        </section>

        <section id='menu' className='py-20 px-4 md:px-8'>
          <div className='max-w-6xl mx-auto'>
            <h3 className='text-4xl font-bold text-center mb-12 text-amber-400 flex items-center justify-center gap-4'><UtensilsCrossed /> Our Menu</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {menuItems.map(item => (
                <div key={item.id} className='bg-stone-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300 transform hover:-translate-y-2'>
                  <img src={imageUrlMap[item.image_url]} alt={item.name} className='w-full h-48 object-cover' />
                  <div className='p-6'>
                    <h4 className='text-2xl font-bold text-amber-400'>{item.name}</h4>
                    <p className='text-stone-300 mt-2'>{item.description}</p>
                    <div className='flex justify-between items-center mt-4'>
                        <p className='text-xl font-bold text-amber-500'>${item.price}</p>
                        {item.dietary_tags && item.dietary_tags.length > 0 && <span className='text-sm bg-green-800 text-green-200 px-2 py-1 rounded'>{item.dietary_tags.join(', ')}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id='chefs' className='py-20 px-4 md:px-8 bg-stone-950'>
          <div className='max-w-6xl mx-auto'>
            <h3 className='text-4xl font-bold text-center mb-12 text-amber-400 flex items-center justify-center gap-4'><ChefHat /> Meet Our Chefs</h3>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              {chefs.map(chef => (
                <div key={chef.id} className='flex flex-col items-center text-center gap-4'>
                  <img src={imageUrlMap[chef.image_url]} alt={chef.name} className='w-48 h-48 rounded-full object-cover border-4 border-amber-400 shadow-lg' />
                  <div>
                    <h4 className='text-3xl font-bold'>{chef.name}</h4>
                    <p className='text-amber-400 font-medium'>{chef.specialty}</p>
                    <p className='text-stone-300 mt-2 max-w-md mx-auto'>{chef.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id='reviews' className='py-20 px-4 md:px-8'>
          <div className='max-w-4xl mx-auto'>
            <h3 className='text-4xl font-bold text-center mb-12 text-amber-400 flex items-center justify-center gap-4'><Star /> Customer Reviews</h3>
            <div className='space-y-8'>
              {reviews.map(review => (
                <div key={review.id} className='bg-stone-800 p-6 rounded-lg shadow-lg'>
                  <div className='flex items-center mb-2'>
                    <div className='flex text-amber-400'>
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className='w-5 h-5 fill-current' />)}
                      {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className='w-5 h-5' />)}
                    </div>
                    <h4 className='ml-4 text-xl font-bold'>{review.customer_name}</h4>
                  </div>
                  <p className='text-stone-300 italic'>\"{review.comment}\"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 md:px-8 py-20'>
            <section id='special-offers'>
                <h3 className='text-4xl font-bold text-center mb-12 text-amber-400 flex items-center justify-center gap-4'><Gift /> Special Offers</h3>
                {specialOffers.map(offer => (
                    <div key={offer.id} className='relative rounded-lg overflow-hidden shadow-lg'>
                        <img src={imageUrlMap[offer.image_url]} alt={offer.title} className='w-full h-64 object-cover'/>
                        <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4'>
                            <h4 className='text-3xl font-bold text-white'>{offer.title}</h4>
                            <p className='text-stone-200 mt-2'>{offer.description}</p>
                            <p className='text-xs text-amber-400 mt-4'>Valid until: {new Date(offer.valid_until).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </section>
            <section id='events'>
                <h3 className='text-4xl font-bold text-center mb-12 text-amber-400 flex items-center justify-center gap-4'><Music /> Upcoming Events</h3>
                 {events.map(event => (
                    <div key={event.id} className='relative rounded-lg overflow-hidden shadow-lg'>
                        <img src={imageUrlMap[event.image_url]} alt={event.name} className='w-full h-64 object-cover'/>
                        <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4'>
                            <h4 className='text-3xl font-bold text-white'>{event.name}</h4>
                            <p className='text-stone-200 mt-2'>{event.description}</p>
                            <p className='text-xs text-amber-400 mt-4'>Date: {new Date(event.event_date).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>

        <section id='reservation' className='py-20 px-4 md:px-8 bg-stone-950'>
            <div className='max-w-2xl mx-auto'>
                <h3 className='text-4xl font-bold text-center mb-12 text-amber-400'>Make a Reservation</h3>
                <form onSubmit={handleReservation} className='space-y-6 bg-stone-800 p-8 rounded-lg shadow-lg'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <input type='text' name='name' placeholder='Your Name' required className='w-full p-3 bg-stone-700 rounded border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400'/>
                        <input type='email' name='email' placeholder='Your Email' required className='w-full p-3 bg-stone-700 rounded border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400'/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <input type='tel' name='phone' placeholder='Phone Number' className='w-full p-3 bg-stone-700 rounded border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400'/>
                        <input type='number' name='party_size' placeholder='Party Size' min='1' required className='w-full p-3 bg-stone-700 rounded border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400'/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <input type='date' name='reservation_date' required className='w-full p-3 bg-stone-700 rounded border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400'/>
                        <input type='time' name='reservation_time' required className='w-full p-3 bg-stone-700 rounded border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400'/>
                    </div>
                    <button type='submit' className='w-full bg-amber-500 text-stone-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-400 transition-transform hover:scale-105 shadow-lg'>Book Now</button>
                </form>
            </div>
        </section>

        <footer id='contact' className='bg-stone-950 text-center p-8 mt-12'>
            <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-8'>
                <div className='text-left'>
                    <h4 className='text-2xl font-bold text-amber-400 mb-4'>Jollof Joy</h4>
                    <p className='text-stone-400'>The taste of Africa in every bite.</p>
                </div>
                <div className='text-left'>
                    <h4 className='text-xl font-bold text-amber-400 mb-4'>Contact Us</h4>
                    <p className='text-stone-400 flex items-center gap-2'><MapPin size={16} /> 123 Koinange Street, Nairobi, Kenya</p>
                    <p className='text-stone-400'>contact@jollofjoy.com</p>
                </div>
                 <div className='text-left'>
                    <h4 className='text-xl font-bold text-amber-400 mb-4'>Hours</h4>
                    <p className='text-stone-400'>Mon - Fri: 12pm - 10pm</p>
                    <p className='text-stone-400'>Sat - Sun: 10am - 11pm</p>
                </div>
            </div>
            <p className='text-stone-500 mt-8 pt-8 border-t border-stone-800'>© 2025 Jollof Joy. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
}
