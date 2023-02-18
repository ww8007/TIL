


```mermaid
classDiagram
class Iterator {
    <<interface>>
    hasNext()
    next()
    remove()
}

class EnumerationIterator {
    + hasNext()
    + next()
    + remove()
}

class Enumeration {
    <<interface>>
    + hasMoreElements()
    + nextElement()
}

Iterator <|-- EnumerationIterator
Enumeration <|-- EnumerationIterator
```

