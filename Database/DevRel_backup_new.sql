--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.0

-- Started on 2023-01-20 19:43:23 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3609 (class 0 OID 16410)
-- Dependencies: 215
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20230119144926-modify_tutorials_add_fields.js
\.


--
-- TOC entry 3608 (class 0 OID 16392)
-- Dependencies: 214
-- Data for Name: tutorials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tutorials (title, description, published, "createdAt", "updatedAt", id, author, category) FROM stdin;
React Native 	The Introduction	t	2022-12-20 12:58:39.408+05:30	2023-01-20 17:39:40.66+05:30	42a70d73-d242-4622-b7da-849ceb7e6aea	\N	1
Lost Skeleton Returns Again!	Exposure of tooth!!	f	2022-12-20 12:57:35.611+05:30	2023-01-20 18:05:34.724+05:30	fc4684cc-78d2-434b-9596-f506e3b0f1d8	\N	6
AureliaJS	Angular's origin	t	2023-01-05 17:29:09.55+05:30	2023-01-20 18:09:53.045+05:30	77967053-338e-40e5-9897-dfb037653306	\N	1
Forced to Kill!	The untold story....	f	2022-12-20 12:57:45.975+05:30	2023-01-05 17:28:29.106+05:30	64e10527-cb8a-4a8f-930e-396db5492f46	\N	\N
opeartion test add	tested	f	2022-12-20 12:52:01.366+05:30	2023-01-05 18:54:48.219+05:30	6bc903c5-0461-49d0-80f6-87ea3399435c	\N	\N
opeartion test edit	tested	f	2022-12-20 12:58:47.19+05:30	2023-01-05 18:56:43.339+05:30	c86b55bf-2529-4378-96fd-0a6c1bf012cf	\N	\N
Solid JS	The Alter ego of ReactJS	f	2022-12-20 14:22:45.812+05:30	2023-01-05 19:26:47.966+05:30	01e2cace-ec91-4b90-a7bc-40b3b4b8ff8f	\N	\N
Golang	The revolution	f	2023-01-10 14:16:20.479+05:30	2023-01-10 14:16:20.479+05:30	8ee81dff-869b-4fab-98fe-4f81bdc5cc2a	\N	\N
Vite	the new build tool from vue	f	2023-01-10 20:56:56.42+05:30	2023-01-10 21:43:25.102+05:30	79051dd0-8824-49bd-b3f7-2f35b4860c4e	\N	\N
Mockingbirds	Eminem	f	2022-12-20 12:57:23.694+05:30	2023-01-19 15:58:02.483+05:30	7f1d3fe4-6456-4619-aa0e-794dfa5dc6e3	\N	\N
The broken leg	Story of a cracked femur	f	2022-12-20 12:57:02.876+05:30	2023-01-19 17:10:47.462+05:30	fb01f094-6585-47ff-ae6b-9813961ef021	\N	\N
My New Book	Test	f	2023-01-20 10:07:42.741+05:30	2023-01-20 10:07:42.742+05:30	6cf2beff-0fca-4fa6-b605-a176086613fc	\N	\N
MY new goo		f	2023-01-20 10:30:54.809+05:30	2023-01-20 10:30:54.81+05:30	9c33f3d8-0cf2-4862-b187-cff83302e6be	\N	\N
My My	Bla bla	f	2023-01-20 10:31:44.035+05:30	2023-01-20 16:43:36.148+05:30	4f22e3ef-aedc-49c8-a2cd-9dd257de142c	\N	3
Fire on Fire!	Sam Smith	t	2022-12-20 12:57:10.755+05:30	2023-01-20 17:29:07.676+05:30	7b857865-b969-46f1-9221-698d9088297f	\N	6
Lost Skeleton	Finding of tooth	t	2022-12-20 12:58:31.253+05:30	2023-01-20 17:29:16.501+05:30	bd1be822-e6a6-4ae0-92b5-134f70e49849	\N	6
React18	The Beginners guide!	t	2022-12-20 12:56:52.286+05:30	2023-01-20 17:29:25.969+05:30	23541257-719c-4c0b-8849-ec6f9975df95	\N	1
\.


-- Completed on 2023-01-20 19:43:23 IST

--
-- PostgreSQL database dump complete
--

