from ninja import NinjaAPI

api = NinjaAPI()


@api.get("/")
def index(request):
    return {"test": 1}


@api.get("/search")
def search(request, q: str = ""):
    sample_data = [
        {"id": 1, "name": "Alice Johnson", "email": "alice@example.com"},
        {"id": 2, "name": "Bob Smith", "email": "bob@example.com"},
        {"id": 3, "name": "Charlie Brown", "email": "charlie@example.com"},
        {"id": 4, "name": "Diana Prince", "email": "diana@example.com"},
        {"id": 5, "name": "Edward Norton", "email": "edward@example.com"},
        {"id": 6, "name": "Frank Miller", "email": "frank@example.com"},
        {"id": 7, "name": "Grace Kelly", "email": "grace@example.com"},
        {"id": 8, "name": "Henry Ford", "email": "henry@example.com"},
        {"id": 9, "name": "Iris Watson", "email": "iris@example.com"},
        {"id": 10, "name": "Jack Wilson", "email": "jack@example.com"},
    ]
    
    if not q:
        return {"results": sample_data, "query": q}
    
    filtered_results = [
        item for item in sample_data 
        if q.lower() in item["name"].lower() or q.lower() in item["email"].lower()
    ]
    
    return {"results": filtered_results, "query": q}
