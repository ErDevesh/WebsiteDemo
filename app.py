from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    c.execute('''
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        branch TEXT,
        semester TEXT,
        scheme TEXT,
        subject TEXT,
        description TEXT,
        pdf TEXT
    )
    ''')

    # Sample Data
    c.execute("INSERT OR IGNORE INTO notes (id,branch,semester,scheme,subject,description,pdf) VALUES (1,'Computer','3','I Scheme','WMN','Wireless Mobile Network Notes','/uploads/wmn.pdf')")

    conn.commit()
    conn.close()

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/model_answer')
def model_answer():
    return render_template('model_answer.html')

@app.route('/branch')
def branch():
    return render_template('branch.html')

@app.route('/mcq')
def mcq():
    return render_template('mcq.html')

@app.route('/books')
def books():
    return render_template('books.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/search_notes', methods=['POST'])
def search_notes():
    branch = request.form['branch']
    semester = request.form['semester']
    scheme = request.form['scheme']
    keyword = request.form['keyword']

    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    c.execute("SELECT * FROM notes WHERE branch=? AND semester=? AND scheme=? AND subject LIKE ?",
              (branch, semester, scheme, f"%{keyword}%"))

    results = c.fetchall()
    conn.close()

    return render_template('index.html', results=results)

if __name__ == '__main__':
    init_db()
    app.run
