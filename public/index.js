const API_URL='http://localhost:3000/api/v1/chapters/lesson'

let lessons = []; 

// Gestion de l'événement de soumission du formulaire pour créer une nouvelle leçon
document.getElementById('lessonForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    // Récupération des valeurs du formulaire
    const title = document.getElementById('title').value;
    const numberOfLessons = document.getElementById('numberOfLessons').value;
    const isActive = document.getElementById('isActive').checked;

    try {
        // Envoi des données du formulaire à l'API via une requête POST
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ title, numberOfLessons, isActive }), 
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`); 
        }

        const newLesson = await response.json(); 

        // Ajout de la nouvelle leçon à la liste existante
        lessons.push(newLesson.data); 

        // Mise à jour dynamique de l'affichage des leçons
        displayLessons(lessons);

        alert('Lesson created successfully!');

        // Réinitialisation du formulaire après une soumission réussie
        document.getElementById('lessonForm').reset();
    } catch (error) {
        console.error('Fetch error:', error); 
        alert(`An error occurred: ${error.message}`);
    }
});

// Fonction pour récupérer toutes les leçons depuis l'API
async function fetchLessons() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success) {
            lessons = result.data; 
            displayLessons(lessons); 
        } else {
            console.error('Error:', result.message); 
        }
    } catch (error) {
        console.error('Fetch error:', error); 
    }
}

// Fonction pour afficher une liste de leçons (utilisée pour la searchbar aussi)
function displayLessons(filteredLessons) {
    const lessonsList = document.getElementById('lessonsList'); 
    lessonsList.innerHTML = '';

    // Création d'une carte pour chaque leçon
    filteredLessons.forEach(lesson => {
        const card = document.createElement('div');
        card.className = 'bg-slate-200 shadow-md rounded-lg p-4 flex flex-col gap-4';

        // Ajout du titre de la leçon
        const title = document.createElement('h2');
        title.className = 'text-lg font-bold';
        title.textContent = lesson.title;

        // Ajout du nombre de leçons
        const numLessons = document.createElement('p');
        numLessons.className = 'text-gray-600';
        numLessons.textContent = `Number of Lessons: ${lesson.numberOfLessons}`;

        // Ajout du statut (actif/inactif) avec une couleur spécifique
        const status = document.createElement('span');
        status.className = lesson.isActive
            ? 'text-green-800 font-medium'
            : 'text-red-800 font-medium';
        status.textContent = lesson.isActive ? 'Active' : 'Inactive';

        // Boutons "Voir" et "Supprimer"
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'flex justify-between';

        const viewButton = document.createElement('button');
        viewButton.className = 'bg-white border-2 border-slate-900 text-slate-900 px-4 py-2 rounded hover:bg-slate-900 hover:text-white';
        viewButton.textContent = 'Voir';
        viewButton.onclick = () => viewLesson(lesson._id);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'bg-red-300 text-white px-4 py-2 rounded hover:bg-red-600';
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => deleteLesson(lesson._id);

        // Ajout des boutons au conteneur
        buttonsContainer.appendChild(viewButton);
        buttonsContainer.appendChild(deleteButton);

        // Construction de la carte
        card.appendChild(title);
        card.appendChild(numLessons);
        card.appendChild(status);
        card.appendChild(buttonsContainer);

        // Ajout de la carte au conteneur global
        lessonsList.appendChild(card);
    });
}

// Fonction pour afficher les détails d'une leçon
function viewLesson(lessonId) {
    //Affiche une modale avec l'id
    alert(`Voir les détails pour la lesson: ${lessonId}`);

}

// Fonction pour supprimer une leçon
async function deleteLesson(lessonId) {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?');
    if (!confirmDelete) return; 

    try {
        const response = await fetch(`${API_URL}/${lessonId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Leçon supprimée avec succès');
            fetchLessons(); 
        } else {
            const result = await response.json();
            alert(`Erreur: ${result.message || 'Impossible de supprimer la leçon'}`);
        }
    } catch (error) {
        console.error('Delete error:', error); 
        alert('Une erreur est survenue lors de la suppression.');
    }
}

// Écouteur d'événement pour la barre de recherche (filtrage en temps réel)
document.getElementById('searchBar').addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase(); 
    const filteredLessons = lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(searchText)
    );
    displayLessons(filteredLessons); 
});

// Charger les leçons lors du chargement de la page
fetchLessons();
