# Experimental evaluation which is part of my master thesis on interoperability among trace formalisms.
  This repository contains a Node.js implementation of a round-trip from xAPI statements to kTBS obsels.
  
# Credits 
  I use xAPI statements and the JSON-LD context provided by TinCan2PROV [1] to generate a Linked-Data representation.
  
# Setup

## Install a kTBS development version and checkout on the branch that implements the new MTMM 
I assume python2 is correctly installed on your machine.

Create an isolated Python environment:
```$ virtualenv ktbs-env-dev```

Go to the directory of the isolated Python environment (created with the previous command):
```$ cd ktbs-env-dev/```

Go to the isolated Python environment (This will change your $PATH so its first entry is the virtualenv’s bin/ directory.):
```$ source bin/activate```

Clone the latest developer version of the kTBS:
```git clone https://github.com/ktbs/ktbs.git```

Go to the source code:
```cd ktbs```

Checkout on the branch that implements the new MTMM:
```git checkout raphael```
Or 
```git checkout b94db6b4cb1cee94a71381d17aa81e520b980aa8```

Go to the `ktbs-env-dev/` directory
```cd ..```

Install kTBS from source:
```pip install -e ktbs/```

If something didn't work, please follow these steps: http://kernel-for-trace-based-systems.readthedocs.io/en/latest/tutorials/install/install-ktbs-dev-version.html

## Retrieving the dependencies of this project

I assume Node.js is correctly installed on your machine.

On the root directory of this project:
```npm install```
  
## Launch the benchmarking
Go to the kTBS directory.
```$ cd ktbs-env-dev```

Activate the virtualenv.
```source bin/activate```

Launch the kTBS server.
```$ ktbs```

Please keep the kTBS running during the next steps.

On the root directory of this project, create output directories: 
 ```
 mkdir \ 
    ./resources/framing && \
    ./resources/in  && \
    ./resources/in-normalized && \
    ./resources/out && \
    ./resources/out-framed && \
    ./resources/out-framed-normalized
 ```

Launch the parsing of xAPI statements and send them to the kTBS:
 ```$ node index```
You will see some POST requests.
 
Launch the second part of the round-trip: 
 ```$ node validate```
 
Make the validation script executable and run it: 
```$ chmod u+x validate.sh && bash validate.sh```

## Results
Those steps produce documents with the same shape as the original xAPI statements and no information loss, so we can claim that the round trip succeeds.

## Raw Results

```
/usr/bin/env bash /home/raphael/code/xapi-to-ktbs/validate.sh
-------
Processing 02abc888-2672-45bb-8256-f01efdda6660 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-02abc888-2672-45bb-8256-f01efdda6660-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425641410803 ;
    ns1:hasBeginDT "2015-03-06T11:30:10.803000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425641410803 ;
    ns1:hasEndDT "2015-03-06T11:30:10.803000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 30ad5565-4963-4570-ae99-46ef88018908 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-30ad5565-4963-4570-ae99-46ef88018908-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422745870615 ;
    ns1:hasBeginDT "2015-01-31T23:11:10.615000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422745870615 ;
    ns1:hasEndDT "2015-01-31T23:11:10.615000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 3f5a3172-8b2b-4cfe-853f-cdefe9e6d119 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-3f5a3172-8b2b-4cfe-853f-cdefe9e6d119-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422742991044 ;
    ns1:hasBeginDT "2015-01-31T22:23:11.044000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422742991044 ;
    ns1:hasEndDT "2015-01-31T22:23:11.044000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 4b8ffa42-7af2-405c-ac6a-2a21aaa62b3b statement
### 6 triples only in  ./resources/out-framed-normalized/eval-4b8ffa42-7af2-405c-ac6a-2a21aaa62b3b-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425605470176 ;
    ns1:hasBeginDT "2015-03-06T01:31:10.176000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425605470176 ;
    ns1:hasEndDT "2015-03-06T01:31:10.176000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 5fecbed0-8cac-4a2c-be04-ee85f4e3f2ce statement
### 6 triples only in  ./resources/out-framed-normalized/eval-5fecbed0-8cac-4a2c-be04-ee85f4e3f2ce-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425585271021 ;
    ns1:hasBeginDT "2015-03-05T19:54:31.021000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425585271021 ;
    ns1:hasEndDT "2015-03-05T19:54:31.021000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 6541f305-8bcc-407d-b3bf-5fd7f7b2b029 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-6541f305-8bcc-407d-b3bf-5fd7f7b2b029-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425627373436 ;
    ns1:hasBeginDT "2015-03-06T07:36:13.436000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425627373436 ;
    ns1:hasEndDT "2015-03-06T07:36:13.436000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 6543bf80-2819-40a8-bf7e-064d9b9f4800 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-6543bf80-2819-40a8-bf7e-064d9b9f4800-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425605344103 ;
    ns1:hasBeginDT "2015-03-06T01:29:04.103000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425605344103 ;
    ns1:hasEndDT "2015-03-06T01:29:04.103000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 6d4cbe14-5fb6-4330-a1cf-a3188c4518e2 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-6d4cbe14-5fb6-4330-a1cf-a3188c4518e2-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422684933839 ;
    ns1:hasBeginDT "2015-01-31T06:15:33.839000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422684933839 ;
    ns1:hasEndDT "2015-01-31T06:15:33.839000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 6e5e7321-4d25-4abb-9bb5-fa4e797d4fb6 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-6e5e7321-4d25-4abb-9bb5-fa4e797d4fb6-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422745120590 ;
    ns1:hasBeginDT "2015-01-31T22:58:40.590000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422745120590 ;
    ns1:hasEndDT "2015-01-31T22:58:40.590000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing 710bdfe7-5230-45ad-bba7-fb99c7fe8888 statement
### 7 triples only in  ./resources/out-framed-normalized/eval-710bdfe7-5230-45ad-bba7-fb99c7fe8888-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix ns2: <http://semweb.mmlab.be/ns/tincan2prov/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] ns2:scaled 0.5300000000000000 .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425563384365 ;
    ns1:hasBeginDT "2015-03-05T13:49:44.365000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425563384365 ;
    ns1:hasEndDT "2015-03-05T13:49:44.365000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

### 1 triples only in  ./resources/in-normalized/eval-710bdfe7-5230-45ad-bba7-fb99c7fe8888-in-normalized.n3
@prefix ns1: <http://semweb.mmlab.be/ns/tincan2prov/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] ns1:scaled 0.53 .

-------
Processing a4f1d248-6f27-40a2-9603-985076aa9dac statement
### 6 triples only in  ./resources/out-framed-normalized/eval-a4f1d248-6f27-40a2-9603-985076aa9dac-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422751717376 ;
    ns1:hasBeginDT "2015-02-01T00:48:37.376000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422751717376 ;
    ns1:hasEndDT "2015-02-01T00:48:37.376000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing abc1234 statement
### 7 triples only in  ./resources/out-framed-normalized/eval-abc1234-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix ns2: <http://semweb.mmlab.be/ns/tincan2prov/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] ns2:scaled 0.5300000000000000 .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425563384365 ;
    ns1:hasBeginDT "2015-03-05T13:49:44.365000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425563384365 ;
    ns1:hasEndDT "2015-03-05T13:49:44.365000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

### 1 triples only in  ./resources/in-normalized/eval-abc1234-in-normalized.n3
@prefix ns1: <http://semweb.mmlab.be/ns/tincan2prov/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] ns1:scaled 0.53 .

-------
Processing be3ece5e-477b-4f02-be8e-5badb5ca9873 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-be3ece5e-477b-4f02-be8e-5badb5ca9873-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422753072203 ;
    ns1:hasBeginDT "2015-02-01T01:11:12.203000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422753072203 ;
    ns1:hasEndDT "2015-02-01T01:11:12.203000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing be418fa0-16fa-4486-b26d-5f5ea59dbbe9 statement
### 7 triples only in  ./resources/out-framed-normalized/eval-be418fa0-16fa-4486-b26d-5f5ea59dbbe9-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix ns2: <http://semweb.mmlab.be/ns/tincan2prov/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] ns2:scaled 0.2700000000000000 .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422643008156 ;
    ns1:hasBeginDT "2015-01-30T18:36:48.156000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422643008156 ;
    ns1:hasEndDT "2015-01-30T18:36:48.156000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

### 1 triples only in  ./resources/in-normalized/eval-be418fa0-16fa-4486-b26d-5f5ea59dbbe9-in-normalized.n3
@prefix ns1: <http://semweb.mmlab.be/ns/tincan2prov/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] ns1:scaled 0.27 .

-------
Processing c1b9bc91-a09d-45bb-a499-ebcbec9f8bf9 statement
Traceback (most recent call last):
  File "/home/raphael/Downloads/rdfdiff", line 60, in <module>
    main()
  File "/home/raphael/Downloads/rdfdiff", line 38, in main
    gr = load(argv[2])
  File "/home/raphael/Downloads/rdfdiff", line 13, in load
    g.load(filename)
  File "/home/raphael/.local/lib/python2.7/site-packages/rdflib/graph.py", line 1041, in load
    self.parse(source, publicID, format)
  File "/home/raphael/.local/lib/python2.7/site-packages/rdflib/graph.py", line 1029, in parse
    data=data, format=format)
  File "/home/raphael/.local/lib/python2.7/site-packages/rdflib/parser.py", line 169, in create_input_source
    file = open(filename, "rb")
IOError: [Errno 2] No such file or directory: u'/home/raphael/code/xapi-to-ktbs/resources/out-framed-normalized/eval-c1b9bc91-a09d-45bb-a499-ebcbec9f8bf9-out-framed-normalized.n3'
-------
Processing ea4fa1e8-e5a9-4293-a4db-074281abd284 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-ea4fa1e8-e5a9-4293-a4db-074281abd284-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422743141561 ;
    ns1:hasBeginDT "2015-01-31T22:25:41.561000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422743141561 ;
    ns1:hasEndDT "2015-01-31T22:25:41.561000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing ee7f4be9-521e-4136-b5b1-7902185a4a19 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-ee7f4be9-521e-4136-b5b1-7902185a4a19-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425644114143 ;
    ns1:hasBeginDT "2015-03-06T12:15:14.143000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425644114143 ;
    ns1:hasEndDT "2015-03-06T12:15:14.143000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing efae389c-b519-4c05-855f-301573a7bb67 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-efae389c-b519-4c05-855f-301573a7bb67-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1425645629179 ;
    ns1:hasBeginDT "2015-03-06T12:40:29.179000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1425645629179 ;
    ns1:hasEndDT "2015-03-06T12:40:29.179000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .

-------
Processing fd48d2e9-d4f6-40fd-973d-144e8ef673c3 statement
### 6 triples only in  ./resources/out-framed-normalized/eval-fd48d2e9-d4f6-40fd-973d-144e8ef673c3-out-framed-normalized.n3
@prefix ns1: <http://liris.cnrs.fr/silex/2009/ktbs#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

[] a <http://localhost:8001/b1/m1#xapiStatement> ;
    ns1:hasBegin 1422662111510 ;
    ns1:hasBeginDT "2015-01-30T23:55:11.510000+00:00"^^xsd:dateTime ;
    ns1:hasEnd 1422662111510 ;
    ns1:hasEndDT "2015-01-30T23:55:11.510000+00:00"^^xsd:dateTime ;
    ns1:hasTrace <http://localhost:8001/b1/t1/> .


Process finished with exit code 0
```


# References
[1]: Tom De Nies, Frank Salliau, Ruben Verborgh, Erik Mannens, and Rik Van de Walle. 2015. TinCan2PROV: Exposing Interoperable Provenance of Learning Processes through Experience API Logs. In Proceedings of the 24th International Conference on World Wide Web (WWW '15 Companion). ACM, New York, NY, USA, 689-694. DOI=http://dx.doi.org/10.1145/2740908.2741744 
