import requests

url = "http://127.0.0.1:8000/api/verbs/"

verbos = [
    {"base_form": "eat", "spanish": "comer", "gerund": "eating", "example": "I love eating pizza on Fridays."},
    {"base_form": "drink", "spanish": "beber", "gerund": "drinking", "example": "He is drinking a glass of water."},
    {"base_form": "sleep", "spanish": "dormir", "gerund": "sleeping", "example": "The cat is sleeping on the sofa."},
    {"base_form": "walk", "spanish": "caminar", "gerund": "walking", "example": "We are walking in the park."},
    {"base_form": "write", "spanish": "escribir", "gerund": "writing", "example": "She is writing a letter to her friend."},
    {"base_form": "read", "spanish": "leer", "gerund": "reading", "example": "I enjoy reading science fiction books."},
    {"base_form": "speak", "spanish": "hablar", "gerund": "speaking", "example": "They are speaking in English."},
    {"base_form": "listen", "spanish": "escuchar", "gerund": "listening", "example": "I am listening to my favorite podcast."},
    {"base_form": "study", "spanish": "estudiar", "gerund": "studying", "example": "He is studying for his exams."},
    {"base_form": "work", "spanish": "trabajar", "gerund": "working", "example": "My father is working at the office."},
    {"base_form": "play", "spanish": "jugar", "gerund": "playing", "example": "The children are playing football."},
    {"base_form": "cook", "spanish": "cocinar", "gerund": "cooking", "example": "My mother is cooking dinner."},
    {"base_form": "buy", "spanish": "comprar", "gerund": "buying", "example": "I am buying some groceries."},
    {"base_form": "sell", "spanish": "vender", "gerund": "vender", "example": "He is selling his old car."},
    {"base_form": "drive", "spanish": "conducir", "gerund": "driving", "example": "She is driving to work."},
    {"base_form": "swim", "spanish": "nadar", "gerund": "swimming", "example": "We are swimming in the pool."},
    {"base_form": "dance", "spanish": "bailar", "gerund": "dancing", "example": "They are dancing at the party."},
    {"base_form": "sing", "spanish": "cantar", "gerund": "singing", "example": "She is singing a beautiful song."},
    {"base_form": "laugh", "spanish": "reír", "gerund": "laughing", "example": "We are laughing at the joke."},
    {"base_form": "cry", "spanish": "llorar", "gerund": "crying", "example": "The baby is crying."}
]

for verbo in verbos:
    response = requests.post(url, json=verbo)
    if response.status_code == 200:
        print(f"✅ Verbo '{verbo['base_form']}' insertado correctamente.")
    else:
        print(f"❌ Error al insertar '{verbo['base_form']}': {response.text}")

print("\n🚀 ¡Carga masiva completada!")

