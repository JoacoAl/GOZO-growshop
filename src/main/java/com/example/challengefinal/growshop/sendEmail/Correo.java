package com.example.challengefinal.growshop.sendEmail;

public class Correo {
    private String remitente;
    private String destinatario;
    private String asunto;
    private String comentario;

    public Correo() {
    }

    public Correo(String remitente, String destinatario, String asunto, String comentario) {
        this.remitente = remitente;
        this.destinatario = destinatario;
        this.asunto = asunto;
        this.comentario = comentario;
    }

    public String getRemitente() {
        return remitente;
    }

    public void setRemitente(String remitente) {
        this.remitente = remitente;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}
