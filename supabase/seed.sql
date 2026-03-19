-- Seed cities
insert into cities (name, slug, active, headline, seo_title, seo_description, travel_fee) values
('Provo', 'provo', true, 'Mobile Detailing in Provo, UT', 'Mobile Car Detailing Provo UT | We Come to You', 'Professional mobile car detailing in Provo, Utah. We come to your home, office, or apartment.', 0),
('Orem', 'orem', true, 'Mobile Detailing in Orem, UT', 'Mobile Car Detailing Orem UT | Same-Day Available', 'Top-rated mobile detailing in Orem, Utah. Book online today.', 0),
('Lehi', 'lehi', true, 'Mobile Detailing in Lehi, UT', 'Mobile Car Detailing Lehi UT | Ceramic Coating Experts', 'Mobile car detailing in Lehi, Utah. Serving Silicon Slopes and surrounding areas.', 15),
('Salt Lake City', 'salt-lake-city', true, 'Mobile Detailing in Salt Lake City, UT', 'Mobile Car Detailing Salt Lake City UT', 'Premium mobile detailing in Salt Lake City, Utah.', 20),
('Draper', 'draper', true, 'Mobile Detailing in Draper, UT', 'Mobile Car Detailing Draper UT | Book Online', 'Mobile car detailing in Draper, Utah.', 15),
('Sandy', 'sandy', true, 'Mobile Detailing in Sandy, UT', 'Mobile Car Detailing Sandy UT | Same-Day Service', 'Mobile detailing in Sandy, Utah. We come to you.', 15),
('St. George', 'st-george', true, 'Mobile Detailing in St. George, UT', 'Mobile Car Detailing St. George UT | Southern Utah', 'Mobile car detailing in St. George, Utah and surrounding areas.', 25),
('Layton', 'layton', true, 'Mobile Detailing in Layton, UT', 'Mobile Car Detailing Layton UT | Davis County', 'Mobile car detailing in Layton, Utah. Serving Davis County.', 20);

-- Seed service areas
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84601','84602','84603','84604'], 10 from cities where slug = 'provo';
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84057','84058','84059','84097'], 10 from cities where slug = 'orem';
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84043','84045'], 12 from cities where slug = 'lehi';
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84101','84102','84103','84104','84105','84106','84107','84108','84109','84111','84115','84116','84117','84118','84119','84120','84121','84123','84124'], 15 from cities where slug = 'salt-lake-city';
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84020','84065'], 10 from cities where slug = 'draper';
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84070','84092','84093','84094'], 10 from cities where slug = 'sandy';
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84770','84771','84790','84791'], 15 from cities where slug = 'st-george';
insert into service_areas (city_id, zip_codes, booking_radius_miles)
select id, ARRAY['84040','84041'], 10 from cities where slug = 'layton';

-- Seed service packages
insert into service_packages (name, description, price, included_services) values
('Basic Wash', 'Exterior hand wash, tire shine, window clean', 79, ARRAY['Exterior hand wash','Tire shine','Window cleaning','Door jamb wipe down']),
('Full Detail', 'Complete interior and exterior detailing', 179, ARRAY['Everything in Basic Wash','Interior vacuum','Dashboard & console wipe','Leather conditioning','Odor treatment','Engine bay wipe']),
('Premium Ceramic', 'Full detail plus ceramic coating protection', 399, ARRAY['Everything in Full Detail','Paint decontamination','Ceramic coating application','6-month protection warranty']);

-- Seed add-ons
insert into add_ons (name, price, description) values
('Pet Hair Removal', 49, 'Thorough pet hair extraction from seats and carpet'),
('Engine Bay Detail', 59, 'Clean and degrease engine bay'),
('Odor Elimination', 39, 'Ozone treatment or enzyme spray'),
('Headlight Restoration', 49, 'Restore cloudy headlights to clear'),
('Ceramic Spray Coating', 99, 'Single-layer spray ceramic for added protection');

-- Seed services
insert into services (name, slug, description, base_price) values
('Interior Detailing', 'interior-detailing', 'Deep interior cleaning including vacuum, steam, leather conditioning, and odor treatment', 99),
('Exterior Wash & Wax', 'exterior-wash-wax', 'Hand wash, clay bar treatment, and carnauba wax protection', 89),
('Full Detail', 'full-detail', 'Complete interior and exterior detailing package', 179),
('Ceramic Coating', 'ceramic-coating', 'Professional ceramic coating for long-term paint protection', 299),
('Pet Hair Removal', 'pet-hair-removal', 'Specialized pet hair extraction from all interior surfaces', 49),
('Odor Removal', 'odor-removal', 'Ozone and enzyme treatment to eliminate odors', 39),
('Fleet Vehicles', 'fleet-vehicles', 'Bulk detailing services for business fleets. Volume discounts available.', 65),
('Membership Plans', 'membership-plans', 'Monthly auto-detailing membership. Save up to 30%.', 59);
