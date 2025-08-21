function SignupPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <form>
                <input type="email" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <button className="btn-primary mt-4">Sign up</button>
            </form>
        </div>
    );
}

export default SignupPage;