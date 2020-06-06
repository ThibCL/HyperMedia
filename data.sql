insert into service (name,description,photo_description,presentation)
values ('Energy/Climat','This service aims to find alternative solutions to reduce the impact of the man on the planet.',
	   'energy-service',
	   'Deforestation, greenhouse gas emissions, global warming, major threats to biodiversity, noise pollution, air quality degradation, soil artificialisation... Our means of transport are the cause of many ecological disasters. And meanwhile, the SNCF is closing stations and stopping night trains. Meanwhile, motorways are being built. We need to stop this process and promote sustainable modes of transport as soon as possible! Lets put pressure on the public authorities so that at last real alternatives to the plane and the car are put in place.');
insert into service_photo(title, service_id) values ('aviation',1);
insert into service_photo(title, service_id) values ('palme',1);
insert into service_photo(title, service_id) values ('autoroute',1);
insert into service_info(info, service_id) values ('71% of French people are opposed to the incorporation of palm oil in fuels (Ipsos/Transports and Environment poll - 21/11/2018)',1);

insert into service (name,description,photo_description,presentation)
values ('Agriculture/Bio','This service aims to reduce to utilization of the pesticide in the agriculture and promote bio.',
	   'agriculture-service',
	   'The most environmentally and socially virtuous agriculture seems to bother part of the agricultural world and policy makers in our country.
Organic farming aids partially abolished in 2017, 3 years delay in payment of organic aids, risk of diversion of another part of the organic aids to other labels, specifications of the organic label mishandled...
In the summer of 2017, alongside the National Federation of Organic Agriculture, Agir pour l Environnement denounced the lack of state support for organic farming in France. Nearly 2 years later, what we feared was happening: the delay in paying organic aid was leading some organic farms into serious financial difficulties, because they were not receiving the sums that were necessary for the transformation of their farming system - and while the expenses were incurred with confidence.');
insert into service_photo(title, service_id) values ('pesticide',2);
insert into service_photo(title, service_id) values ('aviation',2);
insert into service_info(info, service_id) values ('Despite its commitments, the State has still not paid out all the aid promised since 2016, thus putting thousands of organic farmers in difficulty. Some farmers are as much as 30,000 euros late in payment, causing them serious financial damage.',2);
insert into service_info(info, service_id) values ('391,000 tonnes of pesticides and thousands of tonnes of antibiotics are used every year by agriculture in Europe!',2);


insert into person(first_name, last_name,description) values ('Jacque','Caplat','Agronomist, anthropologist, writer. 
He is the secretary of the association and he has been working there for many years. He is one of the pillars of todays ecology.');
insert into person_photo(title, person_id) values ('jacques-caplat1',1);
insert into person_photo(title, person_id) values ('jacques-caplat2',1);

insert into person(first_name, last_name,description) values ('Martin','Serieye','WEB Project Manager at APEnvironnement. Specialized in SEO, web strategy & online mobilization. A weak : collcons. My project : objetheque.');
insert into person_photo(title, person_id) values ('martin-serieye1',2);
insert into person_photo(title, person_id) values ('martin-serieye2',2);

insert into person(first_name, last_name,description) values ('Mathias','Chaplin','Coordinator of the APEnvironment campaigns. Invested in ecology since a young age, he is now in charge of promoting the association throughout the world.');
insert into person_photo(title, person_id) values ('mathias-chaplain1',3);

insert into event(name,presentation,description,photo_description,start_date,end_date,contact) 
values ('PETITION - Stop synthetic pesticides near homes! #stopesticides',
		'While many mayors are adopting decrees banning pesticides on the territory of their municipality, the Minister of Agriculture is trying to put out the fire by launching a consultation aimed at getting a "protection" perimeter of only 5 to 10 metres accepted.
Worse, this consultation, which ends on October 1st, would lead to the adoption of a local charter written by pesticide users that could reduce this perimeter to 3m or less!
Given the multiple exposures faced by people living near fields treated with synthetic pesticides, it is high time to obtain a real protection perimeter of at least 150 meters. In order not to leave farmers without a solution, this ban must be accompanied by technical and financial support.',
		'Call on the Minister of Agrochemicals to ban pesticides near homes',
		'pesticide-event',
		'2020-06-06',
		'2020-07-06',
		1);
insert into event_info(info,event_id) values ('96% OF RESPONDENTS WERE IN FAVOUR OF BANNING PESTICIDES WITHIN 150 M OF HOMES.',1);
insert into event_info(info,event_id) values ('The European agency uses data dating back about 40 years to assess the exposure of local residents to toxic products. UNBELIEVABLE!',1);
insert into event_photo(title,event_id) values ('pesticide-photo',1);
insert into event_photo(title,event_id) values ('sign-photo',1);

insert into event(name,presentation,description,photo_description,start_date,end_date,contact) 
values ('Petition - AVIATION: Stop the climate sale!',
		'AVIATION: THE CLIMATE CRASH
CLIMATE EMERGENCY - From Monday 3 June the deputies will examine the law on mobility. The adoption of this law may be an opportunity to put an end to the tax advantages benefiting air transport!
The future of transport in France is at stake.
At a time when the fight against climate change is more urgent than ever, State support for the least polluting forms of transport must finally become a priority.
SNCF stations and train lines continue to be closed while night trains are disappearing. Meanwhile, air travel enjoys multiple tax privileges: tax-free fuel, no VAT on air tickets on international flights and reduced VAT on domestic flights.',
		'A deciding vote will be decided by a few votes in a few days time: call your MP.',
		'aviation-event',
		'2020-06-23',
		'2020-07-07',
        3);
insert into event_info(info,event_id) values ('Prohibit domestic flights when efficient rail alternatives are available;',2);	
insert into event_info(info,event_id) values ('Allocate tax revenues as a priority to public transport, including the train, in order to promote everyday mobility;',2);	
insert into event_photo(title,event_id) values ('aviation-photo',2);
insert into event_photo(title,event_id) values ('logo-photo',2);

insert into event(name,presentation,description,photo_description,start_date,end_date,contact) 
values ('ORGANIC AIDS: THREE YEARS LATE... THATS ENOUGH!',
		'The State must pay its debts to organic farmers!
In spite of its commitments, the State has still not paid all the aid promised since 2016, thus putting thousands of organic farmers in difficulty. Some farmers are up to 30,000 euros late in their payments, causing them serious financial damage.
For several years now, we have observed that public policies have neglected or even hindered the development of organic farming.
WHAT A PARADOX!
At a time when all agronomic and ecological studies are in favour of organic farming as a future solution to the climate and biodiversity crises, when consumers and more and more farmers want to turn to organic farming, public support has never been so low.',
		'On the occasion of the Salon de l Agriculture, lets mobilize to support organic farmers!',
		'agriculture-event',
		'2020-07-23',
		'2020-07-26',
		2);
insert into event_info(info,event_id) values ('In the summer of 2017, alongside the National Federation of Organic Agriculture, Agir pour l Environnement denounced the lack of state support for organic farming in France.',3);	
insert into event_photo(title,event_id) values ('bio-photo',3);


insert into presents(service_id,event_id) values (1,1);
insert into presents(service_id,event_id) values (1,2);
insert into presents(service_id,event_id) values (2,3);

insert into involves(person_id,service_id,role) values (1,1,'Manager');
insert into involves(person_id,service_id,role) values (2,2,'Manager');
insert into involves(person_id,service_id,role) values (3,2,'Employee');